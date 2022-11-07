import sys
import subprocess
import time
import re
import argparse
import requests


def parse_args(args):
    """
    Parse command line arguments.
    """
    parser = argparse.ArgumentParser(
        description="Get Prometheus metrics metadata and replace the text between <!--METRICS_METADATA_START--> and <!--METRICS_METADATA_END--> with the markdown table.")
    parser.add_argument("context", help="Kubernetes context")
    parser.add_argument("namespace", help="Kubernetes namespace")
    parser.add_argument("file", help="File to update")
    return parser.parse_args(args)


def get_metrics_metadata_from_prometheus(context, namespace):
    """
    Function to get Prometheus metrics metadata in JSON format.
    """
    try:
        proc = subprocess.Popen(["kubectl", "--context", context, "--namespace", namespace,
                                "port-forward", "service/prometheus-" + namespace + "-server", "9090:80"])

        # wait for connection to be established
        while True:
            time.sleep(2)
            try:
                r = requests.get("http://localhost:9090/api/v1/metadata")
                if r.status_code == 200:
                    break
            except:
                proc.poll()
                if proc.returncode is not None:
                    sys.exit("Error: Port-forwarding failed")

        metrics_json = r.json()
    finally:
        proc.kill()
    return metrics_json


def json_to_md_table(metrics_json):
    """
    Function to convert Prometheus metrics metadata to markdown table format.

    Args:
        metrics_json: Prometheus metrics metadata in JSON format (Response to GET /api/v1/metadata request from Prometheus).
    """
    metrics_metadata = metrics_json["data"]
    print(metrics_metadata)
    # build markdown table
    md_table = "| Metric | Description |\n"
    md_table += "| ------ | ----------- |\n"
    for metric in metrics_metadata:
        description = metrics_metadata[metric][0:][0]["help"]
        # regex replace required as some fetched descriptions have faulty code snippets (starting with ` but ending with ')
        md_table += "| " + metric + " | " + re.sub(r"`(.*?)'",r"`\1`",description) + " |\n"

    return md_table


def main():
    # parse args
    args = parse_args(sys.argv[1:])

    metrics_json = get_metrics_metadata_from_prometheus(
        args.context, args.namespace)
    md_table = json_to_md_table(metrics_json)

    file = args.file
    with open(file, 'r') as input_file:
        buf = input_file.read()
        if ("<!--METRICS_METADATA_START-->" not in buf) or ("<!--METRICS_METADATA_END-->" not in buf):
            sys.exit(
                "Error: <!--METRICS_METADATA_START--> or <!--METRICS_METADATA_END--> tags are missing in the input file")

    # replace text between <!--METRICS_METADATA_START--> and <!--METRICS_METADATA_END--> with the markdown table
    buf = re.sub(r'(<!--METRICS_METADATA_START-->)(.*)(<!--METRICS_METADATA_END-->)',
                 r'\g<1>' + "\n\n" + md_table + "\n\n" + r'\g<3>', buf, flags=re.DOTALL)

    with open(file, 'w') as output_file:
        output_file.write(buf)


if __name__ == "__main__":
    main()
