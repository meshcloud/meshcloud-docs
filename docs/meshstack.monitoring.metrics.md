---
id: meshstack.monitoring.metrics
title: Metrics Metadata
---

Prometheus exposes `/api/v1/metadata` endpoint that shows metadata (name and description) of currently scraped metrics. The metadata is rendered in the table below.

> A few metrics do not have a description. To clarify specific metrics description, please contact us.

<!--METRICS_METADATA_START-->

| Metric | Description |
| ------ | ----------- |
| accessProject_total |  |
| alertmanager_alerts | How many alerts by state. |
| alertmanager_alerts_invalid_total | The total number of received alerts that were invalid. |
| alertmanager_alerts_received_total | The total number of received alerts. |
| alertmanager_build_info | A metric with a constant '1' value labeled by version, revision, branch, and goversion from which alertmanager was built. |
| alertmanager_cluster_enabled | Indicates whether the clustering is enabled or not. |
| alertmanager_config_hash | Hash of the currently loaded alertmanager configuration. |
| alertmanager_config_last_reload_success_timestamp_seconds | Timestamp of the last successful configuration reload. |
| alertmanager_config_last_reload_successful | Whether the last configuration reload attempt was successful. |
| alertmanager_dispatcher_aggregation_groups | Number of active aggregation groups |
| alertmanager_dispatcher_alert_processing_duration_seconds | Summary of latencies for the processing of alerts. |
| alertmanager_http_concurrency_limit_exceeded_total | Total number of times an HTTP request failed because the concurrency limit was reached. |
| alertmanager_http_request_duration_seconds | Histogram of latencies for HTTP requests. |
| alertmanager_http_requests_in_flight | Current number of HTTP requests being processed. |
| alertmanager_http_response_size_bytes | Histogram of response size for HTTP requests. |
| alertmanager_integrations | Number of configured integrations. |
| alertmanager_nflog_gc_duration_seconds | Duration of the last notification log garbage collection cycle. |
| alertmanager_nflog_gossip_messages_propagated_total | Number of received gossip messages that have been further gossiped. |
| alertmanager_nflog_queries_total | Number of notification log queries were received. |
| alertmanager_nflog_query_duration_seconds | Duration of notification log query evaluation. |
| alertmanager_nflog_query_errors_total | Number notification log received queries that failed. |
| alertmanager_nflog_snapshot_duration_seconds | Duration of the last notification log snapshot. |
| alertmanager_nflog_snapshot_size_bytes | Size of the last notification log snapshot in bytes. |
| alertmanager_notification_latency_seconds | The latency of notifications in seconds. |
| alertmanager_notification_requests_failed_total | The total number of failed notification requests. |
| alertmanager_notification_requests_total | The total number of attempted notification requests. |
| alertmanager_notifications_failed_total | The total number of failed notifications. |
| alertmanager_notifications_total | The total number of attempted notifications. |
| alertmanager_receivers | Number of configured receivers. |
| alertmanager_silences | How many silences by state. |
| alertmanager_silences_gc_duration_seconds | Duration of the last silence garbage collection cycle. |
| alertmanager_silences_gossip_messages_propagated_total | Number of received gossip messages that have been further gossiped. |
| alertmanager_silences_queries_total | How many silence queries were received. |
| alertmanager_silences_query_duration_seconds | Duration of silence query evaluation. |
| alertmanager_silences_query_errors_total | How many silence received queries did not succeed. |
| alertmanager_silences_snapshot_duration_seconds | Duration of the last silence snapshot. |
| alertmanager_silences_snapshot_size_bytes | Size of the last silence snapshot in bytes. |
| backup_status | Indicates success/failure of the last backup attempt. |
| backup_time_seconds | Last Unix time when this source was backed up. |
| cortex_cache_corrupt_chunks | Total count of corrupt chunks found in cache. |
| cortex_chunk_store_chunks_per_query | Distribution of #chunks per query. |
| cortex_chunk_store_deduped_chunks | Count of chunks which were not stored because they have already been stored by another replica. |
| cortex_chunk_store_index_entries_per_chunk | Number of entries written to storage per chunk. |
| cortex_chunk_store_index_lookups_per_query | Distribution of #index lookups per query. |
| cortex_chunk_store_series_post_intersection_per_query | Distribution of #series (post intersection) per query. |
| cortex_chunk_store_series_pre_intersection_per_query | Distribution of #series (pre intersection) per query. |
| cortex_chunk_store_stored_chunk_bytes | Total bytes stored in chunks per user. |
| cortex_chunk_store_stored_chunks | Total stored chunks per user. |
| cortex_consul_request_duration_seconds | Time spent on consul requests. |
| cortex_deprecated_flags_inuse | The number of deprecated flags currently set. |
| cortex_distributor_ingester_clients | The current number of ingester clients. |
| cortex_experimental_features_in_use | The number of experimental features in use. |
| cortex_ingester_flush_queue_length | The total number of series pending in the flush queue. |
| cortex_kv_request_duration_seconds | Time spent on kv store requests. |
| cortex_member_consul_heartbeats | The total number of heartbeats sent to consul. |
| cortex_member_ring_tokens_owned | The number of tokens owned in the ring. |
| cortex_member_ring_tokens_to_own | The number of tokens to own in the ring. |
| cortex_multikv_mirror_enabled | Is mirroring to secondary store enabled |
| cortex_multikv_mirror_write_errors | Number of failures to mirror-write to secondary store |
| cortex_multikv_mirror_writes | Number of mirror-writes to secondary store |
| cortex_ring_member_ownership_percent | The percent ownership of the ring by member |
| cortex_ring_members | Number of members in the ring |
| cortex_ring_oldest_member_timestamp | Timestamp of the oldest member in the ring. |
| cortex_ring_tokens_owned | The number of tokens in the ring owned by the member |
| cortex_ring_tokens_total | Number of tokens in the ring |
| cortex_table_capacity_units | Per-table capacity, measured in DynamoDB capacity units. |
| cortex_table_manager_create_failures | Number of table creation failures during the last table-manager reconciliation |
| cortex_table_manager_delete_failures | Number of table deletion failures during the last table-manager reconciliation |
| cortex_table_manager_sync_duration_seconds | Time spent synching tables. |
| cortex_table_manager_sync_success_timestamp_seconds | Timestamp of the last successful table manager sync. |
| etcd_debugging_auth_revision | The current revision of auth store. |
| etcd_debugging_disk_backend_commit_rebalance_duration_seconds | The latency distributions of commit.rebalance called by bboltdb backend. |
| etcd_debugging_disk_backend_commit_spill_duration_seconds | The latency distributions of commit.spill called by bboltdb backend. |
| etcd_debugging_disk_backend_commit_write_duration_seconds | The latency distributions of commit.write called by bboltdb backend. |
| etcd_debugging_lease_granted | The total number of granted leases. |
| etcd_debugging_lease_renewed | The number of renewed leases seen by the leader. |
| etcd_debugging_lease_revoked | The total number of revoked leases. |
| etcd_debugging_lease_ttl_total | Bucketed histogram of lease TTLs. |
| etcd_debugging_mvcc_compact_revision | The revision of the last compaction in store. |
| etcd_debugging_mvcc_current_revision | The current revision of store. |
| etcd_debugging_mvcc_db_compaction_keys | Total number of db keys compacted. |
| etcd_debugging_mvcc_db_compaction_last | The unix time of the last db compaction. Resets to 0 on start. |
| etcd_debugging_mvcc_db_compaction_pause_duration_milliseconds | Bucketed histogram of db compaction pause duration. |
| etcd_debugging_mvcc_db_compaction_total_duration_milliseconds | Bucketed histogram of db compaction total duration. |
| etcd_debugging_mvcc_db_total_size_in_bytes | Total size of the underlying database physically allocated in bytes. |
| etcd_debugging_mvcc_delete | Total number of deletes seen by this member. |
| etcd_debugging_mvcc_events | Total number of events sent by this member. |
| etcd_debugging_mvcc_index_compaction_pause_duration_milliseconds | Bucketed histogram of index compaction pause duration. |
| etcd_debugging_mvcc_keys_total | Total number of keys. |
| etcd_debugging_mvcc_pending_events_total | Total number of pending events to be sent. |
| etcd_debugging_mvcc_put | Total number of puts seen by this member. |
| etcd_debugging_mvcc_range | Total number of ranges seen by this member. |
| etcd_debugging_mvcc_slow_watcher_total | Total number of unsynced slow watchers. |
| etcd_debugging_mvcc_total_put_size_in_bytes | The total size of put kv pairs seen by this member. |
| etcd_debugging_mvcc_txn | Total number of txns seen by this member. |
| etcd_debugging_mvcc_watch_stream_total | Total number of watch streams. |
| etcd_debugging_mvcc_watcher_total | Total number of watchers. |
| etcd_debugging_server_lease_expired | The total number of expired leases. |
| etcd_debugging_snap_save_marshalling_duration_seconds | The marshalling cost distributions of save called by snapshot. |
| etcd_debugging_snap_save_total_duration_seconds | The total latency distributions of save called by snapshot. |
| etcd_debugging_store_expires | Total number of expired keys. |
| etcd_debugging_store_watch_requests | Total number of incoming watch requests (new or reestablished). |
| etcd_debugging_store_watchers | Count of currently active watchers. |
| etcd_disk_backend_commit_duration_seconds | The latency distributions of commit called by backend. |
| etcd_disk_backend_defrag_duration_seconds | The latency distribution of backend defragmentation. |
| etcd_disk_backend_snapshot_duration_seconds | The latency distribution of backend snapshots. |
| etcd_disk_wal_fsync_duration_seconds | The latency distributions of fsync called by WAL. |
| etcd_disk_wal_write_bytes_total | Total number of bytes written in WAL. |
| etcd_mvcc_db_open_read_transactions | The number of currently open read transactions |
| etcd_mvcc_db_total_size_in_bytes | Total size of the underlying database physically allocated in bytes. |
| etcd_mvcc_db_total_size_in_use_in_bytes | Total size of the underlying database logically in use in bytes. |
| etcd_mvcc_delete | Total number of deletes seen by this member. |
| etcd_mvcc_hash_duration_seconds | The latency distribution of storage hash operation. |
| etcd_mvcc_hash_rev_duration_seconds | The latency distribution of storage hash by revision operation. |
| etcd_mvcc_put | Total number of puts seen by this member. |
| etcd_mvcc_range | Total number of ranges seen by this member. |
| etcd_mvcc_txn | Total number of txns seen by this member. |
| etcd_network_client_grpc_received_bytes | The total number of bytes received from grpc clients. |
| etcd_network_client_grpc_sent_bytes | The total number of bytes sent to grpc clients. |
| etcd_server_go_version | Which Go version server is running with. 1 for 'server_go_version' label with current version. |
| etcd_server_has_leader | Whether or not a leader exists. 1 is existence, 0 is not. |
| etcd_server_health_failures | The total number of failed health checks |
| etcd_server_health_success | The total number of successful health checks |
| etcd_server_heartbeat_send_failures | The total number of leader heartbeat send failures (likely overloaded from slow disk). |
| etcd_server_is_leader | Whether or not this member is a leader. 1 if is, 0 otherwise. |
| etcd_server_is_learner | Whether or not this member is a learner. 1 if is, 0 otherwise. |
| etcd_server_leader_changes_seen | The number of leader changes seen. |
| etcd_server_learner_promote_successes | The total number of successful learner promotions while this member is leader. |
| etcd_server_proposals_applied_total | The total number of consensus proposals applied. |
| etcd_server_proposals_committed_total | The total number of consensus proposals committed. |
| etcd_server_proposals_failed | The total number of failed proposals seen. |
| etcd_server_proposals_pending | The current number of pending proposals to commit. |
| etcd_server_quota_backend_bytes | Current backend storage quota size in bytes. |
| etcd_server_read_indexes_failed | The total number of failed read indexes seen. |
| etcd_server_slow_apply | The total number of slow apply requests (likely overloaded from slow disk). |
| etcd_server_slow_read_indexes | The total number of pending read indexes not in sync with leader's or timed out read index requests. |
| etcd_server_snapshot_apply_in_progress_total | 1 if the server is applying the incoming snapshot. 0 if none. |
| etcd_server_version | Which version is running. 1 for 'server_version' label with current version. |
| etcd_snap_db_fsync_duration_seconds | The latency distributions of fsyncing .snap.db file |
| etcd_snap_db_save_total_duration_seconds | The total latency distributions of v3 snapshot save |
| etcd_snap_fsync_duration_seconds | The latency distributions of fsync called by snap. |
| go_gc_duration_seconds | A summary of the pause duration of garbage collection cycles. |
| go_goroutines | Number of goroutines that currently exist. |
| go_info | Information about the Go environment. |
| go_memstats_alloc_bytes | Total number of bytes allocated, even if freed. |
| go_memstats_alloc_bytes_total | Total number of bytes allocated, even if freed. |
| go_memstats_buck_hash_sys_bytes | Number of bytes used by the profiling bucket hash table. |
| go_memstats_frees | Total number of frees. |
| go_memstats_frees_total | Total number of frees. |
| go_memstats_gc_cpu_fraction | The fraction of this program's available CPU time used by the GC since the program started. |
| go_memstats_gc_sys_bytes | Number of bytes used for garbage collection system metadata. |
| go_memstats_heap_alloc_bytes | Number of heap bytes allocated and still in use. |
| go_memstats_heap_idle_bytes | Number of heap bytes waiting to be used. |
| go_memstats_heap_inuse_bytes | Number of heap bytes that are in use. |
| go_memstats_heap_objects | Number of allocated objects. |
| go_memstats_heap_released_bytes | Number of heap bytes released to OS. |
| go_memstats_heap_sys_bytes | Number of heap bytes obtained from system. |
| go_memstats_last_gc_time_seconds | Number of seconds since 1970 of last garbage collection. |
| go_memstats_lookups | Total number of pointer lookups. |
| go_memstats_lookups_total | Total number of pointer lookups. |
| go_memstats_mallocs | Total number of mallocs. |
| go_memstats_mallocs_total | Total number of mallocs. |
| go_memstats_mcache_inuse_bytes | Number of bytes in use by mcache structures. |
| go_memstats_mcache_sys_bytes | Number of bytes used for mcache structures obtained from system. |
| go_memstats_mspan_inuse_bytes | Number of bytes in use by mspan structures. |
| go_memstats_mspan_sys_bytes | Number of bytes used for mspan structures obtained from system. |
| go_memstats_next_gc_bytes | Number of heap bytes when next garbage collection will take place. |
| go_memstats_other_sys_bytes | Number of bytes used for other system allocations. |
| go_memstats_stack_inuse_bytes | Number of bytes in use by the stack allocator. |
| go_memstats_stack_sys_bytes | Number of bytes obtained from system for stack allocator. |
| go_memstats_sys_bytes | Number of bytes obtained from system. |
| go_threads | Number of OS threads created. |
| http_client_requests_seconds | Timer of RestTemplate operation |
| http_client_requests_seconds_max | Timer of RestTemplate operation |
| http_server_requests_seconds |  |
| http_server_requests_seconds_max |  |
| httpcomponents_httpclient_pool_route_connections | The number of persistent and leased connections per route. |
| httpcomponents_httpclient_pool_route_max | The configured maximum number of allowed persistent connections per route. |
| httpcomponents_httpclient_pool_route_max_default | The configured default maximum number of allowed persistent connections per route. |
| httpcomponents_httpclient_pool_route_pending | The number of connection requests being blocked awaiting a free connection for all routes. |
| httpcomponents_httpclient_pool_total_connections | The number of persistent and leased connections for all routes. |
| httpcomponents_httpclient_pool_total_max | The configured maximum number of allowed persistent connections for all routes. |
| httpcomponents_httpclient_pool_total_pending | The number of connection requests being blocked awaiting a free connection for all routes. |
| identityconnector_collection_ldap_state_collection_seconds |  |
| identityconnector_collection_ldap_state_collection_seconds_max |  |
| identityconnector_errors_total |  |
| identityconnector_object_import_errors_total |  |
| identityconnector_object_import_success_total |  |
| identityconnector_success_total |  |
| jaeger_tracer_baggage_restrictions_updates | Number of times baggage restrictions were successfully updated |
| jaeger_tracer_baggage_truncations | Number of times baggage was truncated as per baggage restrictions |
| jaeger_tracer_baggage_updates | Number of times baggage was successfully written or updated on spans |
| jaeger_tracer_finished_spans | Number of sampled spans finished by this tracer |
| jaeger_tracer_reporter_queue_length | Current number of spans in the reporter queue |
| jaeger_tracer_reporter_spans | Number of spans successfully reported |
| jaeger_tracer_sampler_queries | Number of times the Sampler succeeded to retrieve sampling strategy |
| jaeger_tracer_sampler_updates | Number of times the Sampler succeeded to retrieve and update sampling strategy |
| jaeger_tracer_span_context_decoding_errors | Number of errors decoding tracing context |
| jaeger_tracer_started_spans | Number of spans started by this tracer as sampled |
| jaeger_tracer_throttled_debug_spans | Number of times debug spans were throttled |
| jaeger_tracer_throttler_updates | Number of times throttler successfully updated |
| jaeger_tracer_traces | Number of traces started by this tracer as sampled |
| jvm_buffer_count_buffers | An estimate of the number of buffers in the pool |
| jvm_buffer_memory_used_bytes | An estimate of the memory that the Java virtual machine is using for this buffer pool |
| jvm_buffer_total_capacity_bytes | An estimate of the total capacity of the buffers in this pool |
| jvm_classes_loaded_classes | The number of classes that are currently loaded in the Java virtual machine |
| jvm_classes_unloaded_classes_total | The total number of classes unloaded since the Java virtual machine has started execution |
| jvm_gc_live_data_size_bytes | Size of old generation memory pool after a full GC |
| jvm_gc_max_data_size_bytes | Max size of old generation memory pool |
| jvm_gc_memory_allocated_bytes_total | Incremented for an increase in the size of the young generation memory pool after one GC to before the next |
| jvm_gc_memory_promoted_bytes_total | Count of positive increases in the size of the old generation memory pool before GC to after GC |
| jvm_gc_pause_seconds | Time spent in GC pause |
| jvm_gc_pause_seconds_max | Time spent in GC pause |
| jvm_memory_committed_bytes | The amount of memory in bytes that is committed for the Java virtual machine to use |
| jvm_memory_max_bytes | The maximum amount of memory in bytes that can be used for memory management |
| jvm_memory_used_bytes | The amount of used memory |
| jvm_threads_daemon_threads | The current number of live daemon threads |
| jvm_threads_live_threads | The current number of live threads including both daemon and non-daemon threads |
| jvm_threads_peak_threads | The peak live thread count since the Java virtual machine started or peak was reset |
| jvm_threads_states_threads | The current number of threads having NEW state |
| kraken_api_chargeback_statements_failed |  |
| kraken_api_subscription_items_total |  |
| kraken_api_subscription_progress_timestamp_seconds |  |
| kraken_api_subscription_restarts_total |  |
| kraken_api_subscription_retry_total |  |
| kraken_platform_monthly_usage_ratio |  |
| kraken_platform_projected_monthly_usage_ratio |  |
| kraken_worker_tentacle_azure_failed_subscription_collections |  |
| kraken_worker_tentacle_collection_duration_seconds_total |  |
| kraken_worker_tentacle_collection_items |  |
| kraken_worker_tentacle_collection_items_total |  |
| kraken_worker_tentacle_collection_progress_timestamp_seconds |  |
| kraken_worker_tentacle_collection_total |  |
| kraken_worker_tentacle_enqueued_collections |  |
| kraken_worker_tentacle_marketplace_catalog_failed_collections_total |  |
| kraken_worker_tentacle_marketplace_catalog_successful_collections_total |  |
| kraken_worker_tentacle_subscription_items_total |  |
| kraken_worker_tentacle_subscription_progress_timestamp_seconds |  |
| kraken_worker_tentacle_subscription_restarts_total |  |
| kraken_worker_tentacle_subscription_retry_total |  |
| krakenworker_db_subscription_items_total |  |
| krakenworker_db_subscription_progress_timestamp_seconds |  |
| krakenworker_db_subscription_restarts_total |  |
| krakenworker_db_subscription_retry_total |  |
| kube_certificatesigningrequest_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_certificatesigningrequest_cert_length | Length of the issued cert |
| kube_certificatesigningrequest_condition | The number of each certificatesigningrequest condition |
| kube_certificatesigningrequest_created | Unix creation timestamp |
| kube_certificatesigningrequest_labels | Kubernetes labels converted to Prometheus labels. |
| kube_configmap_created | Unix creation timestamp |
| kube_configmap_info | Information about configmap. |
| kube_configmap_metadata_resource_version | Resource version representing a specific version of the configmap. |
| kube_cronjob_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_cronjob_created | Unix creation timestamp |
| kube_cronjob_info | Info about cronjob. |
| kube_cronjob_labels | Kubernetes labels converted to Prometheus labels. |
| kube_cronjob_metadata_resource_version | Resource version representing a specific version of the cronjob. |
| kube_cronjob_next_schedule_time | Next time the cronjob should be scheduled. The time after lastScheduleTime, or after the cron job's creation time if it's never been scheduled. Use this to determine if the job is delayed. |
| kube_cronjob_spec_failed_job_history_limit | Failed job history limit tells the controller how many failed jobs should be preserved. |
| kube_cronjob_spec_starting_deadline_seconds | Deadline in seconds for starting the job if it misses scheduled time for any reason. |
| kube_cronjob_spec_successful_job_history_limit | Successful job history limit tells the controller how many completed jobs should be preserved. |
| kube_cronjob_spec_suspend | Suspend flag tells the controller to suspend subsequent executions. |
| kube_cronjob_status_active | Active holds pointers to currently running jobs. |
| kube_cronjob_status_last_schedule_time | LastScheduleTime keeps information of when was the last time the job was successfully scheduled. |
| kube_daemonset_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_daemonset_created | Unix creation timestamp |
| kube_daemonset_labels | Kubernetes labels converted to Prometheus labels. |
| kube_daemonset_metadata_generation | Sequence number representing a specific generation of the desired state. |
| kube_daemonset_status_current_number_scheduled | The number of nodes running at least one daemon pod and are supposed to. |
| kube_daemonset_status_desired_number_scheduled | The number of nodes that should be running the daemon pod. |
| kube_daemonset_status_number_available | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available |
| kube_daemonset_status_number_misscheduled | The number of nodes running a daemon pod but are not supposed to. |
| kube_daemonset_status_number_ready | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready. |
| kube_daemonset_status_number_unavailable | The number of nodes that should be running the daemon pod and have none of the daemon pod running and available |
| kube_daemonset_status_observed_generation | The most recent generation observed by the daemon set controller. |
| kube_daemonset_status_updated_number_scheduled | The total number of nodes that are running updated daemon pod |
| kube_deployment_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_deployment_created | Unix creation timestamp |
| kube_deployment_labels | Kubernetes labels converted to Prometheus labels. |
| kube_deployment_metadata_generation | Sequence number representing a specific generation of the desired state. |
| kube_deployment_spec_paused | Whether the deployment is paused and will not be processed by the deployment controller. |
| kube_deployment_spec_replicas | Number of desired pods for a deployment. |
| kube_deployment_spec_strategy_rollingupdate_max_surge | Maximum number of replicas that can be scheduled above the desired number of replicas during a rolling update of a deployment. |
| kube_deployment_spec_strategy_rollingupdate_max_unavailable | Maximum number of unavailable replicas during a rolling update of a deployment. |
| kube_deployment_status_condition | The current status conditions of a deployment. |
| kube_deployment_status_observed_generation | The generation observed by the deployment controller. |
| kube_deployment_status_replicas | The number of replicas per deployment. |
| kube_deployment_status_replicas_available | The number of available replicas per deployment. |
| kube_deployment_status_replicas_ready | The number of ready replicas per deployment. |
| kube_deployment_status_replicas_unavailable | The number of unavailable replicas per deployment. |
| kube_deployment_status_replicas_updated | The number of updated replicas per deployment. |
| kube_endpoint_address_available | Number of addresses available in endpoint. |
| kube_endpoint_address_not_ready | Number of addresses not ready in endpoint |
| kube_endpoint_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_endpoint_created | Unix creation timestamp |
| kube_endpoint_info | Information about endpoint. |
| kube_endpoint_labels | Kubernetes labels converted to Prometheus labels. |
| kube_horizontalpodautoscaler_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_horizontalpodautoscaler_labels | Kubernetes labels converted to Prometheus labels. |
| kube_horizontalpodautoscaler_metadata_generation | The generation observed by the HorizontalPodAutoscaler controller. |
| kube_horizontalpodautoscaler_spec_max_replicas | Upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than MinReplicas. |
| kube_horizontalpodautoscaler_spec_min_replicas | Lower limit for the number of pods that can be set by the autoscaler, default 1. |
| kube_horizontalpodautoscaler_spec_target_metric | The metric specifications used by this autoscaler when calculating the desired replica count. |
| kube_horizontalpodautoscaler_status_condition | The condition of this autoscaler. |
| kube_horizontalpodautoscaler_status_current_replicas | Current number of replicas of pods managed by this autoscaler. |
| kube_horizontalpodautoscaler_status_desired_replicas | Desired number of replicas of pods managed by this autoscaler. |
| kube_ingress_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_ingress_created | Unix creation timestamp |
| kube_ingress_info | Information about ingress. |
| kube_ingress_labels | Kubernetes labels converted to Prometheus labels. |
| kube_ingress_metadata_resource_version | Resource version representing a specific version of ingress. |
| kube_ingress_path | Ingress host, paths and backend service information. |
| kube_ingress_tls | Ingress TLS host and secret information. |
| kube_job_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_job_complete | The job has completed its execution. |
| kube_job_created | Unix creation timestamp |
| kube_job_failed | The job has failed its execution. |
| kube_job_info | Information about job. |
| kube_job_labels | Kubernetes labels converted to Prometheus labels. |
| kube_job_owner | Information about the Job's owner. |
| kube_job_spec_active_deadline_seconds | The duration in seconds relative to the startTime that the job may be active before the system tries to terminate it. |
| kube_job_spec_completions | The desired number of successfully finished pods the job should be run with. |
| kube_job_spec_parallelism | The maximum desired number of pods the job should run at any given time. |
| kube_job_status_active | The number of actively running pods. |
| kube_job_status_completion_time | CompletionTime represents time when the job was completed. |
| kube_job_status_failed | The number of pods which reached Phase Failed and the reason for failure. |
| kube_job_status_start_time | StartTime represents time when the job was acknowledged by the Job Manager. |
| kube_job_status_succeeded | The number of pods which reached Phase Succeeded. |
| kube_limitrange | Information about limit range. |
| kube_limitrange_created | Unix creation timestamp |
| kube_mutatingwebhookconfiguration_created | Unix creation timestamp. |
| kube_mutatingwebhookconfiguration_info | Information about the MutatingWebhookConfiguration. |
| kube_mutatingwebhookconfiguration_metadata_resource_version | Resource version representing a specific version of the MutatingWebhookConfiguration. |
| kube_namespace_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_namespace_created | Unix creation timestamp |
| kube_namespace_labels | Kubernetes labels converted to Prometheus labels. |
| kube_namespace_status_condition | The condition of a namespace. |
| kube_namespace_status_phase | kubernetes namespace status phase. |
| kube_networkpolicy_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_networkpolicy_created | Unix creation timestamp of network policy |
| kube_networkpolicy_labels | Kubernetes labels converted to Prometheus labels. |
| kube_networkpolicy_spec_egress_rules | Number of egress rules on the networkpolicy |
| kube_networkpolicy_spec_ingress_rules | Number of ingress rules on the networkpolicy |
| kube_node_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_node_created | Unix creation timestamp |
| kube_node_info | Information about a cluster node. |
| kube_node_labels | Kubernetes labels converted to Prometheus labels. |
| kube_node_role | The role of a cluster node. |
| kube_node_spec_taint | The taint of a cluster node. |
| kube_node_spec_unschedulable | Whether a node can schedule new pods. |
| kube_node_status_allocatable | The allocatable for different resources of a node that are available for scheduling. |
| kube_node_status_capacity | The capacity for different resources of a node. |
| kube_node_status_condition | The condition of a cluster node. |
| kube_persistentvolume_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_persistentvolume_capacity_bytes | Persistentvolume capacity in bytes. |
| kube_persistentvolume_claim_ref | Information about the Persitant Volume Claim Reference. |
| kube_persistentvolume_info | Information about persistentvolume. |
| kube_persistentvolume_labels | Kubernetes labels converted to Prometheus labels. |
| kube_persistentvolume_status_phase | The phase indicates if a volume is available, bound to a claim, or released by a claim. |
| kube_persistentvolumeclaim_access_mode | The access mode(s) specified by the persistent volume claim. |
| kube_persistentvolumeclaim_info | Information about persistent volume claim. |
| kube_persistentvolumeclaim_labels | Kubernetes labels converted to Prometheus labels. |
| kube_persistentvolumeclaim_resource_requests_storage_bytes | The capacity of storage requested by the persistent volume claim. |
| kube_persistentvolumeclaim_status_condition | Information about status of different conditions of persistent volume claim. |
| kube_persistentvolumeclaim_status_phase | The phase the persistent volume claim is currently in. |
| kube_pod_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_pod_completion_time | Completion time in unix timestamp for a pod. |
| kube_pod_container_info | Information about a container in a pod. |
| kube_pod_container_resource_limits | The number of requested limit resource by a container. |
| kube_pod_container_resource_requests | The number of requested request resource by a container. |
| kube_pod_container_state_started | Start time in unix timestamp for a pod container. |
| kube_pod_container_status_last_terminated_reason | Describes the last reason the container was in terminated state. |
| kube_pod_container_status_ready | Describes whether the containers readiness check succeeded. |
| kube_pod_container_status_restarts_total | The number of container restarts per container. |
| kube_pod_container_status_running | Describes whether the container is currently in running state. |
| kube_pod_container_status_terminated | Describes whether the container is currently in terminated state. |
| kube_pod_container_status_terminated_reason | Describes the reason the container is currently in terminated state. |
| kube_pod_container_status_waiting | Describes whether the container is currently in waiting state. |
| kube_pod_container_status_waiting_reason | Describes the reason the container is currently in waiting state. |
| kube_pod_created | Unix creation timestamp |
| kube_pod_deletion_timestamp | Unix deletion timestamp |
| kube_pod_info | Information about pod. |
| kube_pod_init_container_info | Information about an init container in a pod. |
| kube_pod_init_container_resource_limits | The number of requested limit resource by an init container. |
| kube_pod_init_container_resource_limits_cpu_cores | The number of CPU cores requested limit by an init container. |
| kube_pod_init_container_resource_limits_ephemeral_storage_bytes | Bytes of ephemeral-storage requested limit by an init container. |
| kube_pod_init_container_resource_limits_memory_bytes | Bytes of memory requested limit by an init container. |
| kube_pod_init_container_resource_limits_storage_bytes | Bytes of storage requested limit by an init container. |
| kube_pod_init_container_resource_requests | The number of requested request resource by an init container. |
| kube_pod_init_container_resource_requests_cpu_cores | The number of CPU cores requested by an init container. |
| kube_pod_init_container_resource_requests_ephemeral_storage_bytes | Bytes of ephemeral-storage requested by an init container. |
| kube_pod_init_container_resource_requests_memory_bytes | Bytes of memory requested by an init container. |
| kube_pod_init_container_resource_requests_storage_bytes | Bytes of storage requested by an init container. |
| kube_pod_init_container_status_last_terminated_reason | Describes the last reason the init container was in terminated state. |
| kube_pod_init_container_status_ready | Describes whether the init containers readiness check succeeded. |
| kube_pod_init_container_status_restarts_total | The number of restarts for the init container. |
| kube_pod_init_container_status_running | Describes whether the init container is currently in running state. |
| kube_pod_init_container_status_terminated | Describes whether the init container is currently in terminated state. |
| kube_pod_init_container_status_terminated_reason | Describes the reason the init container is currently in terminated state. |
| kube_pod_init_container_status_waiting | Describes whether the init container is currently in waiting state. |
| kube_pod_init_container_status_waiting_reason | Describes the reason the init container is currently in waiting state. |
| kube_pod_labels | Kubernetes labels converted to Prometheus labels. |
| kube_pod_overhead_cpu_cores | The pod overhead in regards to cpu cores associated with running a pod. |
| kube_pod_overhead_memory_bytes | The pod overhead in regards to memory associated with running a pod. |
| kube_pod_owner | Information about the Pod's owner. |
| kube_pod_restart_policy | Describes the restart policy in use by this pod. |
| kube_pod_runtimeclass_name_info | The runtimeclass associated with the pod. |
| kube_pod_spec_volumes_persistentvolumeclaims_info | Information about persistentvolumeclaim volumes in a pod. |
| kube_pod_spec_volumes_persistentvolumeclaims_readonly | Describes whether a persistentvolumeclaim is mounted read only. |
| kube_pod_start_time | Start time in unix timestamp for a pod. |
| kube_pod_status_phase | The pods current phase. |
| kube_pod_status_ready | Describes whether the pod is ready to serve requests. |
| kube_pod_status_reason | The pod status reasons |
| kube_pod_status_scheduled | Describes the status of the scheduling process for the pod. |
| kube_pod_status_scheduled_time | Unix timestamp when pod moved into scheduled status |
| kube_pod_status_unschedulable | Describes the unschedulable status for the pod. |
| kube_poddisruptionbudget_created | Unix creation timestamp |
| kube_poddisruptionbudget_status_current_healthy | Current number of healthy pods |
| kube_poddisruptionbudget_status_desired_healthy | Minimum desired number of healthy pods |
| kube_poddisruptionbudget_status_expected_pods | Total number of pods counted by this disruption budget |
| kube_poddisruptionbudget_status_observed_generation | Most recent generation observed when updating this PDB status |
| kube_poddisruptionbudget_status_pod_disruptions_allowed | Number of pod disruptions that are currently allowed |
| kube_replicaset_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_replicaset_created | Unix creation timestamp |
| kube_replicaset_labels | Kubernetes labels converted to Prometheus labels. |
| kube_replicaset_metadata_generation | Sequence number representing a specific generation of the desired state. |
| kube_replicaset_owner | Information about the ReplicaSet's owner. |
| kube_replicaset_spec_replicas | Number of desired pods for a ReplicaSet. |
| kube_replicaset_status_fully_labeled_replicas | The number of fully labeled replicas per ReplicaSet. |
| kube_replicaset_status_observed_generation | The generation observed by the ReplicaSet controller. |
| kube_replicaset_status_ready_replicas | The number of ready replicas per ReplicaSet. |
| kube_replicaset_status_replicas | The number of replicas per ReplicaSet. |
| kube_replicationcontroller_created | Unix creation timestamp |
| kube_replicationcontroller_metadata_generation | Sequence number representing a specific generation of the desired state. |
| kube_replicationcontroller_owner | Information about the ReplicationController's owner. |
| kube_replicationcontroller_spec_replicas | Number of desired pods for a ReplicationController. |
| kube_replicationcontroller_status_available_replicas | The number of available replicas per ReplicationController. |
| kube_replicationcontroller_status_fully_labeled_replicas | The number of fully labeled replicas per ReplicationController. |
| kube_replicationcontroller_status_observed_generation | The generation observed by the ReplicationController controller. |
| kube_replicationcontroller_status_ready_replicas | The number of ready replicas per ReplicationController. |
| kube_replicationcontroller_status_replicas | The number of replicas per ReplicationController. |
| kube_resourcequota | Information about resource quota. |
| kube_resourcequota_created | Unix creation timestamp |
| kube_secret_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_secret_created | Unix creation timestamp |
| kube_secret_info | Information about secret. |
| kube_secret_labels | Kubernetes labels converted to Prometheus labels. |
| kube_secret_metadata_resource_version | Resource version representing a specific version of secret. |
| kube_secret_type | Type about secret. |
| kube_service_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_service_created | Unix creation timestamp |
| kube_service_info | Information about service. |
| kube_service_labels | Kubernetes labels converted to Prometheus labels. |
| kube_service_spec_external_ip | Service external ips. One series for each ip |
| kube_service_spec_type | Type about service. |
| kube_service_status_load_balancer_ingress | Service load balancer ingress status |
| kube_statefulset_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_statefulset_created | Unix creation timestamp |
| kube_statefulset_labels | Kubernetes labels converted to Prometheus labels. |
| kube_statefulset_metadata_generation | Sequence number representing a specific generation of the desired state for the StatefulSet. |
| kube_statefulset_replicas | Number of desired pods for a StatefulSet. |
| kube_statefulset_status_current_revision | Indicates the version of the StatefulSet used to generate Pods in the sequence [0,currentReplicas). |
| kube_statefulset_status_observed_generation | The generation observed by the StatefulSet controller. |
| kube_statefulset_status_replicas | The number of replicas per StatefulSet. |
| kube_statefulset_status_replicas_available | The number of available replicas per StatefulSet. |
| kube_statefulset_status_replicas_current | The number of current replicas per StatefulSet. |
| kube_statefulset_status_replicas_ready | The number of ready replicas per StatefulSet. |
| kube_statefulset_status_replicas_updated | The number of updated replicas per StatefulSet. |
| kube_statefulset_status_update_revision | Indicates the version of the StatefulSet used to generate Pods in the sequence [replicas-updatedReplicas,replicas) |
| kube_storageclass_annotations | Kubernetes annotations converted to Prometheus labels. |
| kube_storageclass_created | Unix creation timestamp |
| kube_storageclass_info | Information about storageclass. |
| kube_storageclass_labels | Kubernetes labels converted to Prometheus labels. |
| kube_validatingwebhookconfiguration_created | Unix creation timestamp. |
| kube_validatingwebhookconfiguration_info | Information about the ValidatingWebhookConfiguration. |
| kube_validatingwebhookconfiguration_metadata_resource_version | Resource version representing a specific version of the ValidatingWebhookConfiguration. |
| kube_volumeattachment_created | Unix creation timestamp |
| kube_volumeattachment_info | Information about volumeattachment. |
| kube_volumeattachment_labels | Kubernetes labels converted to Prometheus labels. |
| kube_volumeattachment_spec_source_persistentvolume | PersistentVolume source reference. |
| kube_volumeattachment_status_attached | Information about volumeattachment. |
| kube_volumeattachment_status_attachment_metadata | volumeattachment metadata. |
| log_messages | Total number of log messages. |
| logback_events_total | Number of error level events that made it to the logs |
| loki_boltdb_shipper_compact_tables_operation | Total number of tables compaction done by status |
| loki_boltdb_shipper_compact_tables_operation_duration_seconds | Time (in seconds) spent in compacting all the tables |
| loki_boltdb_shipper_compact_tables_operation_last_successful_run_timestamp_seconds | Unix timestamp of the last successful compaction run |
| loki_boltdb_shipper_initial_tables_download_duration_seconds | Time (in seconds) spent in downloading of files per table, initially i.e for the first time |
| loki_boltdb_shipper_initial_tables_download_size_bytes | Size of files (in bytes) downloaded per table, initially i.e for the first time |
| loki_boltdb_shipper_open_existing_file_failures | Total number of failures in opening of existing files while loading active index tables during startup |
| loki_boltdb_shipper_request_duration_seconds | Time (in seconds) spent serving requests when using boltdb shipper |
| loki_boltdb_shipper_tables_sync_operation | Total number of tables sync operations done by status |
| loki_boltdb_shipper_tables_upload_operation | Total number of upload operations done by status |
| loki_build_info | A metric with a constant '1' value labeled by version, revision, branch, and goversion from which loki was built. |
| loki_distributor_bytes_received | The total number of uncompressed bytes received per tenant |
| loki_distributor_ingester_appends | The total number of batch appends sent to ingesters. |
| loki_distributor_lines_received | The total number of lines received per tenant |
| loki_distributor_replication_factor | The configured replication factor. |
| loki_inflight_requests | Current number of inflight requests. |
| loki_ingester_autoforget_unhealthy_ingesters | Total number of ingesters automatically forgotten |
| loki_ingester_blocks_per_chunk | The number of blocks in a chunk. |
| loki_ingester_checkpoint_creations | Total number of checkpoint creations attempted. |
| loki_ingester_checkpoint_creations_failed | Total number of checkpoint creations that failed. |
| loki_ingester_checkpoint_deletions | Total number of checkpoint deletions attempted. |
| loki_ingester_checkpoint_deletions_failed | Total number of checkpoint deletions that failed. |
| loki_ingester_checkpoint_duration_seconds | Time taken to create a checkpoint. |
| loki_ingester_checkpoint_logged_bytes | Total number of bytes written to disk for checkpointing. |
| loki_ingester_chunk_age_seconds | Distribution of chunk ages (when stored). |
| loki_ingester_chunk_bounds_hours | Distribution of chunk end-start durations. |
| loki_ingester_chunk_compression_ratio | Compression ratio of chunks (when stored). |
| loki_ingester_chunk_encode_time_seconds | Distribution of chunk encode times. |
| loki_ingester_chunk_entries | Distribution of stored lines per chunk (when stored). |
| loki_ingester_chunk_size_bytes | Distribution of stored chunk sizes (when stored). |
| loki_ingester_chunk_stored_bytes | Total bytes stored in chunks per tenant. |
| loki_ingester_chunk_utilization | Distribution of stored chunk utilization (when stored). |
| loki_ingester_chunks_created | The total number of chunks created in the ingester. |
| loki_ingester_chunks_flushed | Total flushed chunks per reason. |
| loki_ingester_chunks_stored | Total stored chunks per tenant. |
| loki_ingester_client_request_duration_seconds | Time spent doing Ingester requests. |
| loki_ingester_memory_chunks | The total number of chunks in memory. |
| loki_ingester_memory_streams | The total number of streams in memory per tenant. |
| loki_ingester_received_chunks | The total number of chunks received by this ingester whilst joining. |
| loki_ingester_samples_per_chunk | The number of samples in a chunk. |
| loki_ingester_sent_chunks | The total number of chunks sent by this ingester whilst leaving. |
| loki_ingester_streams_created | The total number of streams created per tenant. |
| loki_ingester_streams_removed | The total number of streams removed per tenant. |
| loki_ingester_wal_bytes_in_use | Total number of bytes in use by the WAL recovery process. |
| loki_ingester_wal_disk_full_failures | Total number of wal write failures due to full disk. |
| loki_ingester_wal_duplicate_entries | Entries discarded during WAL replay due to existing in checkpoints. |
| loki_ingester_wal_logged_bytes | Total number of bytes written to disk for WAL records. |
| loki_ingester_wal_records_logged | Total number of WAL records logged. |
| loki_ingester_wal_recovered_bytes | Total number of bytes recovered from the WAL. |
| loki_ingester_wal_recovered_chunks | Total number of chunks recovered from the WAL checkpoints. |
| loki_ingester_wal_recovered_entries | Total number of entries recovered from the WAL. |
| loki_ingester_wal_recovered_streams | Total number of streams recovered from the WAL. |
| loki_ingester_wal_replay_duration_seconds | Time taken to replay the checkpoint and the WAL. |
| loki_ingester_wal_replay_flushing | Whether the wal replay is in a flushing phase due to backpressure |
| loki_logql_querystats_duplicates | Total count of duplicates found while executing LogQL queries. |
| loki_logql_querystats_ingester_sent_lines | Total count of lines sent from ingesters while executing LogQL queries. |
| loki_panic | The total number of panic triggered |
| loki_request_duration_seconds | Time (in seconds) spent serving HTTP requests. |
| loki_request_message_bytes | Size (in bytes) of messages received in the request. |
| loki_response_message_bytes | Size (in bytes) of messages sent in response. |
| loki_tcp_connections | Current number of accepted TCP connections. |
| meshdb_subscription_items_total |  |
| meshdb_subscription_progress_timestamp_seconds |  |
| meshdb_subscription_restarts_total |  |
| meshdb_subscription_retry_total |  |
| meshfed_activeUsers | meshfed_activeUsers |
| meshfed_allUsers | meshfed_allUsers |
| meshfed_customerCount | meshfed_customerCount |
| meshfed_failed_servicebroker_metrics_call_total |  |
| meshfed_inactiveUsers | meshfed_inactiveUsers |
| meshfed_platform | meshfed |
| meshfed_projectCount | meshfed_projectCount |
| meshfed_tenant_count | meshfed_tenant |
| meshfedapi_db_subscription_items_total |  |
| meshfedapi_db_subscription_progress_timestamp_seconds |  |
| meshfedapi_db_subscription_restarts_total |  |
| meshfedapi_db_subscription_retry_total |  |
| mysql_exporter_collector_duration_seconds | Collector time duration. |
| mysql_exporter_last_scrape_error | Whether the last scrape of metrics from MySQL resulted in an error (1 for error, 0 for success). |
| mysql_exporter_scrapes_total | Total number of times MySQL was scraped for metrics. |
| mysql_galera_variables_info | PXC/Galera variables information. |
| mysql_global_status_aborted_clients | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aborted_connects | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aborted_connects_preauth | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_access_denied_errors | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_column_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_database_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_function_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_package_body_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_package_spec_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_procedure_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_proxy_users | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_role_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_roles | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_table_grants | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_acl_users | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_blocks_not_flushed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_blocks_unused | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_blocks_used | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_read_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_write_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_pagecache_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_aria_transaction_log_syncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_bytes_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_cache_disk_use | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_cache_use | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_commits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_group_commit_trigger_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_group_commit_trigger_lock_wait | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_group_commit_trigger_timeout | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_group_commits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_snapshot_position | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_stmt_cache_disk_use | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_binlog_stmt_cache_use | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_buffer_pool_dirty_pages | Innodb buffer pool dirty pages. |
| mysql_global_status_buffer_pool_page_changes_total | Innodb buffer pool page state changes. |
| mysql_global_status_buffer_pool_pages | Innodb buffer pool pages by state. |
| mysql_global_status_busy_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_bytes_received | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_bytes_sent | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_column_compressions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_column_decompressions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_commands_total | Total number of executed MySQL commands. |
| mysql_global_status_compression | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_connection_errors_total | Total number of MySQL connection errors. |
| mysql_global_status_connections | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_cpu_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_created_tmp_disk_tables | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_created_tmp_files | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_created_tmp_tables | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_delayed_errors | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_delayed_insert_threads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_delayed_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_delete_scan | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_empty_queries | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_executed_events | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_executed_triggers | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_application_time_periods | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_check_constraint | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_custom_aggregate_functions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_delay_key_write | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_dynamic_columns | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_fulltext | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_gis | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_insert_returning | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_invisible_columns | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_json | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_locale | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_subquery | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_system_versioning | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_timezone | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_trigger | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_window_functions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_feature_xml | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_handlers_total | Total number of executed MySQL handlers. |
| mysql_global_status_innodb_adaptive_hash_hash_searches | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_adaptive_hash_non_hash_searches | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_available_undo_logs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_background_log_sync | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_bytes_data | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_bytes_dirty | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_load_incomplete | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_read_ahead | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_read_ahead_evicted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_read_ahead_rnd | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_read_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_wait_free | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_buffer_pool_write_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_checkpoint_age | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_checkpoint_max_age | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_fsyncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_pending_fsyncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_pending_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_pending_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_read | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_data_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_dblwr_pages_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_dblwr_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_deadlocks | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_defragment_compression_failures | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_defragment_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_defragment_failures | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_key_rotation_list_length | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_merge_blocks_decrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_merge_blocks_encrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_rowlog_blocks_decrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_rowlog_blocks_encrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_temp_blocks_decrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_n_temp_blocks_encrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_num_key_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_rotation_estimated_iops | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_rotation_pages_flushed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_rotation_pages_modified | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_rotation_pages_read_from_cache | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_encryption_rotation_pages_read_from_disk | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_bzip2 | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_lz4 | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_lzma | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_lzo | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_punch_hole | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_have_snappy | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_history_list_length | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_discarded_delete_marks | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_discarded_deletes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_discarded_inserts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_free_list | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_merged_delete_marks | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_merged_deletes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_merged_inserts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_merges | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_segment_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_ibuf_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_instant_alter_column | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_log_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_log_write_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_log_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_lsn_current | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_lsn_flushed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_lsn_last_checkpoint | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_master_thread_active_loops | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_master_thread_idle_loops | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_max_trx_id | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_mem_adaptive_hash | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_mem_dictionary | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_index_pages_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_non_index_pages_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_open_files | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_page_compressed_trim_op | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_pages_decrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_pages_encrypted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_pages_page_compressed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_pages_page_compression_error | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_num_pages_page_decompressed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_onlineddl_pct_progress | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_onlineddl_rowlog_pct_used | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_onlineddl_rowlog_rows | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_os_log_fsyncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_os_log_pending_fsyncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_os_log_pending_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_os_log_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_page_compression_saved | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_page_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_pages_created | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_pages_read | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_pages_written | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_lock_current_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_lock_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_lock_time_avg | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_lock_time_max | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_lock_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_row_ops_total | Total number of MySQL InnoDB row operations. |
| mysql_global_status_innodb_secondary_index_triggered_cluster_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_secondary_index_triggered_cluster_reads_avoided | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_system_rows_deleted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_system_rows_inserted | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_system_rows_read | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_system_rows_updated | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_truncated_status_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_innodb_undo_truncations | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_blocks_not_flushed | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_blocks_unused | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_blocks_used | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_blocks_warm | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_read_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_reads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_write_requests | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_key_writes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_last_query_cost | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_master_gtid_wait_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_master_gtid_wait_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_master_gtid_wait_timeouts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_max_statement_time_exceeded | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_max_used_connections | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_memory_used | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_memory_used_initial | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_not_flushed_delayed_rows | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_open_files | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_open_streams | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_open_table_definitions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_open_tables | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_opened_files | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_opened_plugin_libraries | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_opened_table_definitions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_opened_tables | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_opened_views | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_performance_schema_lost_total | Total number of MySQL instrumentations that could not be loaded or created due to memory constraints. |
| mysql_global_status_prepared_stmt_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_free_blocks | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_free_memory | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_hits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_inserts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_lowmem_prunes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_not_cached | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_queries_in_cache | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_qcache_total_blocks | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_queries | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_questions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rows_read | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rows_sent | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rows_tmp_read | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_clients | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_get_ack | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_net_avg_wait_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_net_wait_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_net_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_no_times | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_no_tx | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_request_ack | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_status | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_timefunc_failures | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_tx_avg_wait_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_tx_wait_time | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_tx_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_wait_pos_backtraverse | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_wait_sessions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_master_yes_tx | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_slave_send_ack | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_semi_sync_slave_status | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_rpl_transactions_multi_engine | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_select_full_join | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_select_full_range_join | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_select_range | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_select_range_check | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_select_scan | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_connections | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_heartbeat_period | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_open_temp_tables | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_received_heartbeats | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_retried_transactions | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_running | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slave_skipped_errors | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slaves_connected | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slaves_running | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slow_launch_threads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_slow_queries | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_sort_merge_passes | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_sort_priority_queue_sorts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_sort_range | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_sort_rows | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_sort_scan | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_accept_renegotiates | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_accepts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_callback_cache_hits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_client_connects | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_connect_renegotiates | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_ctx_verify_depth | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_ctx_verify_mode | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_default_timeout | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_finished_accepts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_finished_connects | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_session_cache_hits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_session_cache_misses | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_session_cache_overflows | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_session_cache_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_session_cache_timeouts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_sessions_reused | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_used_session_cache_entries | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_verify_depth | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_ssl_verify_mode | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_subquery_cache_hit | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_subquery_cache_miss | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_syncs | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_locks_immediate | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_locks_waited | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_open_cache_active_instances | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_open_cache_hits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_open_cache_misses | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_table_open_cache_overflows | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_tc_log_max_pages_used | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_tc_log_page_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_tc_log_page_waits | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threadpool_idle_threads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threadpool_threads | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threads_cached | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threads_connected | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threads_created | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_threads_running | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_transactions_gtid_foreign_engine | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_transactions_multi_engine | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_update_scan | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_uptime | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_uptime_since_flush_status | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_applier_thread_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_cluster_conf_id | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_cluster_size | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_cluster_status | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_connected | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_local_bf_aborts | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_local_index | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_ready | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_rollbacker_thread_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_status_wsrep_thread_count | Generic metric from SHOW GLOBAL STATUS. |
| mysql_global_variables_analyze_sample_percentage | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_checkpoint_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_checkpoint_log_activity | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_encrypt_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_force_start_after_recovery_failures | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_group_commit_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_log_file_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_max_sort_file_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_page_checksum | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_pagecache_age_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_pagecache_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_pagecache_division_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_pagecache_file_hash_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_repair_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_sort_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_aria_used_for_temp_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_auto_increment_increment | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_auto_increment_offset | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_autocommit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_automatic_sp_privileges | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_back_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_big_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_annotate_row_events | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_commit_wait_count | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_commit_wait_usec | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_direct_non_transactional_updates | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_file_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_optimize_thread_scheduling | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_binlog_stmt_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_bulk_insert_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_check_constraint_checks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_column_compression_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_column_compression_zlib_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_column_compression_zlib_wrap | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_connect_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_core_file | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_deadlock_search_depth_long | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_deadlock_search_depth_short | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_deadlock_timeout_long | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_deadlock_timeout_short | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_debug_no_thread_alarm | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_default_password_lifetime | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_default_week_format | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_delay_key_write | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_delayed_insert_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_delayed_insert_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_delayed_queue_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_disconnect_on_expired_password | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_div_precision_increment | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_encrypt_binlog | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_encrypt_tmp_disk_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_encrypt_tmp_files | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_eq_range_index_dive_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_event_scheduler | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_expensive_subquery_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_expire_logs_days | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_explicit_defaults_for_timestamp | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_extra_max_connections | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_extra_port | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_flush | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_flush_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_foreign_key_checks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_ft_max_word_len | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_ft_min_word_len | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_ft_query_expansion_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_general_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_group_concat_max_len | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_gtid_cleanup_batch_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_gtid_domain_id | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_gtid_ignore_duplicates | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_gtid_strict_mode | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_compress | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_crypt | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_dynamic_loading | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_geometry | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_openssl | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_profiling | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_query_cache | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_rtree_keys | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_ssl | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_have_symlink | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_histogram_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_host_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_idle_readonly_transaction_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_idle_transaction_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_idle_write_transaction_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_ignore_builtin_innodb | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_in_predicate_conversion_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_adaptive_flushing | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_adaptive_flushing_lwm | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_adaptive_hash_index | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_adaptive_hash_index_parts | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_adaptive_max_sleep_delay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_autoextend_increment | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_autoinc_lock_mode | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_background_scrub_data_check_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_background_scrub_data_compressed | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_background_scrub_data_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_background_scrub_data_uncompressed | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buf_dump_status_frequency | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_chunk_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_dump_at_shutdown | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_dump_now | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_dump_pct | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_load_abort | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_load_at_startup | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_load_now | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_buffer_pool_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_change_buffer_max_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_cmp_per_index_enabled | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_commit_concurrency | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_compression_default | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_compression_failure_threshold_pct | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_compression_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_compression_pad_pct_max | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_concurrency_tickets | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_deadlock_detect | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_default_encryption_key_id | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment_fill_factor | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment_fill_factor_n_recs | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment_frequency | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment_n_pages | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_defragment_stats_accuracy | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_disable_sort_file_cache | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_disallow_writes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_doublewrite | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encrypt_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encrypt_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encrypt_temporary_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encryption_rotate_key_age | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encryption_rotation_iops | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_encryption_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_fast_shutdown | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_fatal_semaphore_wait_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_file_per_table | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_fill_factor | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_flush_log_at_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_flush_log_at_trx_commit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_flush_neighbors | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_flush_sync | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_flushing_avg_loops | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_force_load_corrupted | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_force_primary_key | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_force_recovery | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_enable_diag_print | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_enable_stopword | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_max_token_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_min_token_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_num_word_optimize | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_result_cache_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_sort_pll_degree | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_ft_total_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_immediate_scrub_data_uncompressed | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_io_capacity | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_io_capacity_max | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_lock_wait_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_checksums | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_compressed_pages | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_file_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_files_in_group | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_optimize_ddl | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_log_write_ahead_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_lru_flush_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_lru_scan_depth | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_dirty_pages_pct | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_dirty_pages_pct_lwm | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_purge_lag | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_purge_lag_delay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_purge_lag_wait | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_max_undo_log_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_old_blocks_pct | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_old_blocks_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_online_alter_log_max_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_open_files | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_optimize_fulltext_only | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_page_cleaners | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_page_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_prefix_index_cluster_optimization | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_print_all_deadlocks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_purge_batch_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_purge_rseg_truncate_frequency | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_purge_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_random_read_ahead | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_read_ahead_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_read_io_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_read_only | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_replication_delay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_rollback_on_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_scrub_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_scrub_log_speed | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_sort_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_spin_wait_delay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_auto_recalc | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_include_delete_marked | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_modified_counter | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_on_metadata | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_persistent | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_persistent_sample_pages | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_traditional | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_stats_transient_sample_pages | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_status_output | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_status_output_locks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_strict_mode | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_sync_array_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_sync_spin_loops | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_table_locks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_thread_concurrency | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_thread_sleep_delay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_undo_log_truncate | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_undo_logs | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_undo_tablespaces | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_use_atomic_writes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_use_native_aio | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_innodb_write_io_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_interactive_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_join_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_join_buffer_space_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_join_cache_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_keep_files_on_create | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_cache_age_threshold | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_cache_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_cache_division_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_cache_file_hash_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_key_cache_segments | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_large_files_support | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_large_page_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_large_pages | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_local_infile | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_lock_wait_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_locked_in_memory | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_bin | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_bin_compress | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_bin_compress_min_len | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_bin_trust_function_creators | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_queries_not_using_indexes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_slave_updates | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_slow_admin_statements | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_slow_rate_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_slow_slave_statements | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_tc_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_log_warnings | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_long_query_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_low_priority_updates | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_lower_case_file_system | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_lower_case_table_names | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_master_verify_checksum | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_allowed_packet | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_binlog_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_binlog_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_binlog_stmt_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_connect_errors | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_connections | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_delayed_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_digest_length | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_error_count | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_heap_table_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_insert_delayed_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_join_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_length_for_sort_data | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_password_errors | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_prepared_stmt_count | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_recursive_iterations | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_relay_log_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_rowid_filter_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_seeks_for_key | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_session_mem_used | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_sort_length | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_sp_recursion_depth | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_statement_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_tmp_tables | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_user_connections | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_max_write_lock_count | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_metadata_locks_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_metadata_locks_hash_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_min_examined_row_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_mrr_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_data_pointer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_max_sort_file_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_mmap_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_repair_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_sort_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_myisam_use_mmap | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_mysql56_temporal_format | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_net_buffer_length | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_net_read_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_net_retry_count | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_net_write_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_old | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_old_passwords | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_open_files_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_max_sel_arg_weight | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_prune_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_search_depth | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_selectivity_sampling_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_trace_max_mem_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_optimizer_use_condition_selectivity | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_accounts_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_digests_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_stages_history_long_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_stages_history_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_statements_history_long_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_statements_history_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_transactions_history_long_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_transactions_history_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_waits_history_long_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_events_waits_history_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_hosts_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_cond_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_cond_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_digest_length | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_file_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_file_handles | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_file_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_index_stat | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_memory_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_metadata_locks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_mutex_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_mutex_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_prepared_statements_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_program_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_rwlock_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_rwlock_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_socket_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_socket_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_sql_text_length | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_stage_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_statement_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_statement_stack | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_table_handles | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_table_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_table_lock_stat | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_thread_classes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_max_thread_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_session_connect_attrs_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_setup_actors_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_setup_objects_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_performance_schema_users_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_port | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_preload_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_profiling | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_profiling_history_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_progress_report_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_protocol_version | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_alloc_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_min_res_unit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_strip_comments | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_type | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_cache_wlock_invalidate | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_query_prealloc_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_range_alloc_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_read_binlog_speed_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_read_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_read_only | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_read_rnd_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_relay_log_purge | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_relay_log_recovery | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_relay_log_space_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_replicate_annotate_row_events | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_report_port | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_require_secure_transport | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rowid_merge_buff_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_master_enabled | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_master_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_master_trace_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_master_wait_no_slave | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_slave_delay_master | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_slave_enabled | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_slave_kill_conn_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_rpl_semi_sync_slave_trace_level | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_secure_auth | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_secure_timestamp | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_server_id | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_session_track_schema | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_session_track_state_change | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_session_track_transaction_info | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_skip_external_locking | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_skip_name_resolve | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_skip_networking | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_skip_show_database | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_compressed_protocol | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_domain_parallel_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_max_allowed_packet | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_net_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_parallel_max_queued | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_parallel_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_parallel_workers | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_run_triggers_for_rbr | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_skip_errors | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_sql_verify_checksum | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_transaction_retries | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slave_transaction_retry_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slow_launch_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_slow_query_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sort_buffer_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_auto_is_null | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_big_selects | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_buffer_result | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_if_exists | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_log_bin | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_log_off | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_notes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_quote_show_create | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_safe_updates | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_select_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_slave_skip_counter | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sql_warnings | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_standard_compliant_cte | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_stored_program_cache | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_strict_password_validation | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sync_binlog | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sync_frm | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sync_master_info | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sync_relay_log | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_sync_relay_log_info | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_table_definition_cache | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_table_open_cache | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_table_open_cache_instances | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tcp_keepalive_interval | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tcp_keepalive_probes | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tcp_keepalive_time | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tcp_nodelay | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_cache_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_dedicated_listener | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_exact_stats | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_idle_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_max_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_oversubscribe | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_prio_kickup_timer | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_pool_stall_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_thread_stack | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tmp_disk_table_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tmp_memory_table_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tmp_table_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_transaction_alloc_block_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_transaction_prealloc_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_tx_read_only | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_unique_checks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_updatable_views_with_limit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_userstat | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wait_timeout | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_auto_increment_control | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_causal_reads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_certify_nonpk | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_convert_lock_to_trx | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_desync | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_dirty_reads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_drupal_282555_workaround | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_gtid_domain_id | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_gtid_mode | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_ignore_apply_errors | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_load_data_splitting | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_log_conflicts | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_max_ws_rows | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_max_ws_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_mysql_replication_bundle | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_on | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_recover | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_replicate_myisam | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_restart_slave | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_retry_autocommit | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_slave_fk_checks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_slave_threads | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_slave_uk_checks | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_sst_donor_rejects_queries | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_strict_ddl | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_sync_wait | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_global_variables_wsrep_trx_fragment_size | Generic gauge metric from SHOW GLOBAL VARIABLES. |
| mysql_info_schema_innodb_cmp_compress_ops_ok_total | Number of times a B-tree page of the size PAGE_SIZE has been successfully compressed. |
| mysql_info_schema_innodb_cmp_compress_ops_total | Number of times a B-tree page of the size PAGE_SIZE has been compressed. |
| mysql_info_schema_innodb_cmp_compress_time_seconds_total | Total time in seconds spent in attempts to compress B-tree pages. |
| mysql_info_schema_innodb_cmp_uncompress_ops_total | Number of times a B-tree page of the size PAGE_SIZE has been uncompressed. |
| mysql_info_schema_innodb_cmp_uncompress_time_seconds_total | Total time in seconds spent in uncompressing B-tree pages. |
| mysql_info_schema_innodb_cmpmem_pages_free_total | Number of blocks of the size PAGE_SIZE that are currently available for allocation. |
| mysql_info_schema_innodb_cmpmem_pages_used_total | Number of blocks of the size PAGE_SIZE that are currently in use. |
| mysql_info_schema_innodb_cmpmem_relocation_ops_total | Number of times a block of the size PAGE_SIZE has been relocated. |
| mysql_info_schema_innodb_cmpmem_relocation_time_seconds_total | Total time in seconds spent in relocating blocks. |
| mysql_slave_status_connect_retry | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_exec_master_log_pos | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_executed_log_entries | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_last_errno | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_last_io_errno | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_last_sql_errno | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_master_port | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_master_server_id | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_master_ssl_allowed | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_master_ssl_verify_server_cert | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_max_relay_log_size | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_read_master_log_pos | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_relay_log_pos | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_relay_log_space | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_retried_transactions | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_seconds_behind_master | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_skip_counter | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_ddl_groups | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_heartbeat_period | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_io_running | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_non_transactional_groups | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_received_heartbeats | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_sql_running | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_slave_transactional_groups | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_sql_delay | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_until_log_pos | Generic metric from SHOW SLAVE STATUS. |
| mysql_slave_status_using_gtid | Generic metric from SHOW SLAVE STATUS. |
| mysql_up | Whether the MySQL server is up. |
| mysql_version_info | MySQL version and distribution. |
| mysqld_exporter_build_info | A metric with a constant '1' value labeled by version, revision, branch, and goversion from which mysqld_exporter was built. |
| net_conntrack_dialer_conn_attempted_total | Total number of connections attempted by the given dialer a given name. |
| net_conntrack_dialer_conn_closed_total | Total number of connections closed which originated from the dialer of a given name. |
| net_conntrack_dialer_conn_established_total | Total number of connections successfully established by the given dialer a given name. |
| net_conntrack_dialer_conn_failed_total | Total number of connections failed to dial by the dialer a given name. |
| net_conntrack_listener_conn_accepted_total | Total number of connections opened to the listener of a given name. |
| net_conntrack_listener_conn_closed_total | Total number of connections closed that were made to the listener of a given name. |
| os_fd_limit | The file descriptor limit. |
| os_fd_used | The number of used file descriptors. |
| platform_access_total |  |
| probe_dns_lookup_time_seconds | Returns the time taken for probe dns lookup in seconds |
| probe_duration_seconds | Returns how long the probe took to complete in seconds |
| probe_failed_due_to_regex | Indicates if probe failed due to regex |
| probe_http_content_length | Length of http content response |
| probe_http_duration_seconds | Duration of http request by phase, summed over all redirects |
| probe_http_redirects | The number of redirects |
| probe_http_ssl | Indicates if SSL was used for the final redirect |
| probe_http_status_code | Response HTTP status code |
| probe_http_uncompressed_body_length | Length of uncompressed response body |
| probe_http_version | Returns the version of HTTP of the probe response |
| probe_ip_addr_hash | Specifies the hash of IP address. It's useful to detect if the IP address changes. |
| probe_ip_protocol | Specifies whether probe ip protocol is IP4 or IP6 |
| probe_ssl_earliest_cert_expiry | Returns earliest SSL cert expiry in unixtime |
| probe_ssl_last_chain_expiry_timestamp_seconds | Returns last SSL chain expiry in timestamp seconds |
| probe_ssl_last_chain_info | Contains SSL leaf certificate information |
| probe_success | Displays whether or not the probe was a success |
| probe_tls_version_info | Contains the TLS version used |
| process_cpu_seconds | Total user and system CPU time spent in seconds. |
| process_cpu_seconds_total | Total user and system CPU time spent in seconds. |
| process_cpu_usage | The "recent cpu usage" for the Java Virtual Machine process |
| process_files_max_files | The maximum file descriptor count |
| process_files_open_files | The open file descriptor count |
| process_max_fds | Maximum number of open file descriptors. |
| process_open_fds | Number of open file descriptors. |
| process_resident_memory_bytes | Resident memory size in bytes. |
| process_start_time_seconds | Start time of the process since unix epoch in seconds. |
| process_uptime_seconds | The uptime of the Java virtual machine |
| process_virtual_memory_bytes | Virtual memory size in bytes. |
| process_virtual_memory_max_bytes | Maximum amount of virtual memory available in bytes. |
| prometheus_api_remote_read_queries | The current number of remote read queries being executed or waiting. |
| prometheus_build_info | A metric with a constant '1' value labeled by version, revision, branch, and goversion from which prometheus was built. |
| prometheus_config_last_reload_success_timestamp_seconds | Timestamp of the last successful configuration reload. |
| prometheus_config_last_reload_successful | Whether the last configuration reload attempt was successful. |
| prometheus_engine_queries | The current number of queries being executed or waiting. |
| prometheus_engine_queries_concurrent_max | The max number of concurrent queries. |
| prometheus_engine_query_duration_seconds | Query timings |
| prometheus_engine_query_log_enabled | State of the query log. |
| prometheus_engine_query_log_failures_total | The number of query log failures. |
| prometheus_http_request_duration_seconds | Histogram of latencies for HTTP requests. |
| prometheus_http_requests_total | Counter of HTTP requests. |
| prometheus_http_response_size_bytes | Histogram of response size for HTTP requests. |
| prometheus_local_storage_memory_chunkdescs | The current number of chunk descriptors in memory. |
| prometheus_notifications_alertmanagers_discovered | The number of alertmanagers discovered and active. |
| prometheus_notifications_dropped_total | Total number of alerts dropped due to errors when sending to Alertmanager. |
| prometheus_notifications_errors_total | Total number of errors sending alert notifications. |
| prometheus_notifications_latency_seconds | Latency quantiles for sending alert notifications. |
| prometheus_notifications_queue_capacity | The capacity of the alert notifications queue. |
| prometheus_notifications_queue_length | The number of alert notifications in the queue. |
| prometheus_notifications_sent_total | Total number of alerts sent. |
| prometheus_remote_storage_enqueue_retries_total | Total number of times enqueue has failed because a shards queue was full. |
| prometheus_remote_storage_exemplars_in | Exemplars in to remote storage, compare to exemplars out for queue managers. |
| prometheus_remote_storage_highest_timestamp_in_seconds | Highest timestamp that has come into the remote storage via the Appender interface, in seconds since epoch. |
| prometheus_remote_storage_max_samples_per_send | The maximum number of samples to be sent, in a single request, to the remote storage. |
| prometheus_remote_storage_metadata_bytes_total | The total number of bytes of metadata sent by the queue after compression. |
| prometheus_remote_storage_metadata_failed_total | Total number of metadata entries which failed on send to remote storage, non-recoverable errors. |
| prometheus_remote_storage_metadata_retried_total | Total number of metadata entries which failed on send to remote storage but were retried because the send error was recoverable. |
| prometheus_remote_storage_metadata_total | Total number of metadata entries sent to remote storage. |
| prometheus_remote_storage_queue_highest_sent_timestamp_seconds | Timestamp from a WAL sample, the highest timestamp successfully sent by this queue, in seconds since epoch. |
| prometheus_remote_storage_samples_bytes_total | The total number of bytes of samples sent by the queue after compression. |
| prometheus_remote_storage_samples_dropped_total | Total number of samples which were dropped after being read from the WAL before being sent via remote write. |
| prometheus_remote_storage_samples_failed_total | Total number of samples which failed on send to remote storage, non-recoverable errors. |
| prometheus_remote_storage_samples_in | Samples in to remote storage, compare to samples out for queue managers. |
| prometheus_remote_storage_samples_in_total | Samples in to remote storage, compare to samples out for queue managers. |
| prometheus_remote_storage_samples_pending | The number of samples pending in the queues shards to be sent to the remote storage. |
| prometheus_remote_storage_samples_retried_total | Total number of samples which failed on send to remote storage but were retried because the send error was recoverable. |
| prometheus_remote_storage_samples_total | Total number of samples sent to remote storage. |
| prometheus_remote_storage_sent_batch_duration_seconds | Duration of send calls to the remote storage. |
| prometheus_remote_storage_shard_capacity | The capacity of each shard of the queue used for parallel sending to the remote storage. |
| prometheus_remote_storage_shards | The number of shards used for parallel sending to the remote storage. |
| prometheus_remote_storage_shards_desired | The number of shards that the queues shard calculation wants to run based on the rate of samples in vs. samples out. |
| prometheus_remote_storage_shards_max | The maximum number of shards that the queue is allowed to run. |
| prometheus_remote_storage_shards_min | The minimum number of shards that the queue is allowed to run. |
| prometheus_remote_storage_string_interner_zero_reference_releases | The number of times release has been called for strings that are not interned. |
| prometheus_remote_storage_string_interner_zero_reference_releases_total | The number of times release has been called for strings that are not interned. |
| prometheus_rule_evaluation_duration_seconds | The duration for a rule to execute. |
| prometheus_rule_evaluation_failures_total | The total number of rule evaluation failures. |
| prometheus_rule_evaluations_total | The total number of rule evaluations. |
| prometheus_rule_group_duration_seconds | The duration of rule group evaluations. |
| prometheus_rule_group_interval_seconds | The interval of a rule group. |
| prometheus_rule_group_iterations_missed_total | The total number of rule group evaluations missed due to slow rule group evaluation. |
| prometheus_rule_group_iterations_total | The total number of scheduled rule group evaluations, whether executed or missed. |
| prometheus_rule_group_last_duration_seconds | The duration of the last rule group evaluation. |
| prometheus_rule_group_last_evaluation_samples | The number of samples returned during the last rule group evaluation. |
| prometheus_rule_group_last_evaluation_timestamp_seconds | The timestamp of the last rule group evaluation in seconds. |
| prometheus_rule_group_rules | The number of rules. |
| prometheus_sd_consul_rpc_duration_seconds | The duration of a Consul RPC call in seconds. |
| prometheus_sd_consul_rpc_failures_total | The number of Consul RPC call failures. |
| prometheus_sd_discovered_targets | Current number of discovered targets. |
| prometheus_sd_dns_lookup_failures | The number of DNS-SD lookup failures. |
| prometheus_sd_dns_lookup_failures_total | The number of DNS-SD lookup failures. |
| prometheus_sd_dns_lookups | The number of DNS-SD lookups. |
| prometheus_sd_dns_lookups_total | The number of DNS-SD lookups. |
| prometheus_sd_failed_configs | Current number of service discovery configurations that failed to load. |
| prometheus_sd_file_read_errors | The number of File-SD read errors. |
| prometheus_sd_file_read_errors_total | The number of File-SD read errors. |
| prometheus_sd_file_scan_duration_seconds | The duration of the File-SD scan in seconds. |
| prometheus_sd_kubernetes_events_total | The number of Kubernetes events handled. |
| prometheus_sd_kubernetes_http_request_duration_seconds | Summary of latencies for HTTP requests to the Kubernetes API by endpoint. |
| prometheus_sd_kubernetes_http_request_total | Total number of HTTP requests to the Kubernetes API by status code. |
| prometheus_sd_kubernetes_workqueue_depth | Current depth of the work queue. |
| prometheus_sd_kubernetes_workqueue_items_total | Total number of items added to the work queue. |
| prometheus_sd_kubernetes_workqueue_latency_seconds | How long an item stays in the work queue. |
| prometheus_sd_kubernetes_workqueue_longest_running_processor_seconds | Duration of the longest running processor in the work queue. |
| prometheus_sd_kubernetes_workqueue_unfinished_work_seconds | How long an item has remained unfinished in the work queue. |
| prometheus_sd_kubernetes_workqueue_work_duration_seconds | How long processing an item from the work queue takes. |
| prometheus_sd_received_updates_total | Total number of update events received from the SD providers. |
| prometheus_sd_updates_delayed_total | Total number of update events that couldn't be sent immediately. |
| prometheus_sd_updates_total | Total number of update events sent to the SD consumers. |
| prometheus_target_interval_length_seconds | Actual intervals between scrapes. |
| prometheus_target_metadata_cache_bytes | The number of bytes that are currently used for storing metric metadata in the cache |
| prometheus_target_metadata_cache_entries | Total number of metric metadata entries in the cache |
| prometheus_target_scrape_pool_exceeded_label_limits | Total number of times scrape pools hit the label limits, during sync or config reload. |
| prometheus_target_scrape_pool_exceeded_target_limit | Total number of times scrape pools hit the target limit, during sync or config reload. |
| prometheus_target_scrape_pool_exceeded_target_limit_total | Total number of times scrape pools hit the target limit, during sync or config reload. |
| prometheus_target_scrape_pool_reloads | Total number of scrape pool reloads. |
| prometheus_target_scrape_pool_reloads_failed | Total number of failed scrape pool reloads. |
| prometheus_target_scrape_pool_reloads_failed_total | Total number of failed scrape pool reloads. |
| prometheus_target_scrape_pool_reloads_total | Total number of scrape pool reloads. |
| prometheus_target_scrape_pool_sync_total | Total number of syncs that were executed on a scrape pool. |
| prometheus_target_scrape_pool_targets | Current number of targets in this scrape pool. |
| prometheus_target_scrape_pools | Total number of scrape pool creation attempts. |
| prometheus_target_scrape_pools_failed | Total number of scrape pool creations that failed. |
| prometheus_target_scrape_pools_failed_total | Total number of scrape pool creations that failed. |
| prometheus_target_scrape_pools_total | Total number of scrape pool creation attempts. |
| prometheus_target_scrapes_cache_flush_forced | How many times a scrape cache was flushed due to getting big while scrapes are failing. |
| prometheus_target_scrapes_cache_flush_forced_total | How many times a scrape cache was flushed due to getting big while scrapes are failing. |
| prometheus_target_scrapes_exceeded_body_size_limit | Total number of scrapes that hit the body size limit |
| prometheus_target_scrapes_exceeded_sample_limit | Total number of scrapes that hit the sample limit and were rejected. |
| prometheus_target_scrapes_exceeded_sample_limit_total | Total number of scrapes that hit the sample limit and were rejected. |
| prometheus_target_scrapes_exemplar_out_of_order | Total number of exemplar rejected due to not being out of the expected order. |
| prometheus_target_scrapes_exemplar_out_of_order_total | Total number of exemplar rejected due to not being out of the expected order. |
| prometheus_target_scrapes_sample_duplicate_timestamp | Total number of samples rejected due to duplicate timestamps but different values. |
| prometheus_target_scrapes_sample_duplicate_timestamp_total | Total number of samples rejected due to duplicate timestamps but different values. |
| prometheus_target_scrapes_sample_out_of_bounds | Total number of samples rejected due to timestamp falling outside of the time bounds. |
| prometheus_target_scrapes_sample_out_of_bounds_total | Total number of samples rejected due to timestamp falling outside of the time bounds. |
| prometheus_target_scrapes_sample_out_of_order | Total number of samples rejected due to not being out of the expected order. |
| prometheus_target_scrapes_sample_out_of_order_total | Total number of samples rejected due to not being out of the expected order. |
| prometheus_target_sync_length_seconds | Actual interval to sync the scrape pool. |
| prometheus_template_text_expansion_failures | The total number of template text expansion failures. |
| prometheus_template_text_expansion_failures_total | The total number of template text expansion failures. |
| prometheus_template_text_expansions | The total number of template text expansions. |
| prometheus_template_text_expansions_total | The total number of template text expansions. |
| prometheus_treecache_watcher_goroutines | The current number of watcher goroutines. |
| prometheus_treecache_zookeeper_failures_total | The total number of ZooKeeper failures. |
| prometheus_tsdb_blocks_loaded | Number of currently loaded data blocks |
| prometheus_tsdb_checkpoint_creations_failed_total | Total number of checkpoint creations that failed. |
| prometheus_tsdb_checkpoint_creations_total | Total number of checkpoint creations attempted. |
| prometheus_tsdb_checkpoint_deletions_failed_total | Total number of checkpoint deletions that failed. |
| prometheus_tsdb_checkpoint_deletions_total | Total number of checkpoint deletions attempted. |
| prometheus_tsdb_compaction_chunk_range_seconds | Final time range of chunks on their first compaction |
| prometheus_tsdb_compaction_chunk_samples | Final number of samples on their first compaction |
| prometheus_tsdb_compaction_chunk_size_bytes | Final size of chunks on their first compaction |
| prometheus_tsdb_compaction_duration_seconds | Duration of compaction runs |
| prometheus_tsdb_compaction_populating_block | Set to 1 when a block is currently being written to the disk. |
| prometheus_tsdb_compactions_failed_total | Total number of compactions that failed for the partition. |
| prometheus_tsdb_compactions_skipped_total | Total number of skipped compactions due to disabled auto compaction. |
| prometheus_tsdb_compactions_total | Total number of compactions that were executed for the partition. |
| prometheus_tsdb_compactions_triggered_total | Total number of triggered compactions for the partition. |
| prometheus_tsdb_data_replay_duration_seconds | Time taken to replay the data on disk. |
| prometheus_tsdb_head_active_appenders | Number of currently active appender transactions |
| prometheus_tsdb_head_chunks | Total number of chunks in the head block. |
| prometheus_tsdb_head_chunks_created_total | Total number of chunks created in the head |
| prometheus_tsdb_head_chunks_removed_total | Total number of chunks removed in the head |
| prometheus_tsdb_head_gc_duration_seconds | Runtime of garbage collection in the head block. |
| prometheus_tsdb_head_max_time | Maximum timestamp of the head block. The unit is decided by the library consumer. |
| prometheus_tsdb_head_max_time_seconds | Maximum timestamp of the head block. |
| prometheus_tsdb_head_min_time | Minimum time bound of the head block. The unit is decided by the library consumer. |
| prometheus_tsdb_head_min_time_seconds | Minimum time bound of the head block. |
| prometheus_tsdb_head_samples_appended_total | Total number of appended samples. |
| prometheus_tsdb_head_series | Total number of series in the head block. |
| prometheus_tsdb_head_series_created_total | Total number of series created in the head |
| prometheus_tsdb_head_series_not_found_total | Total number of requests for series that were not found. |
| prometheus_tsdb_head_series_removed_total | Total number of series removed in the head |
| prometheus_tsdb_head_truncations_failed_total | Total number of head truncations that failed. |
| prometheus_tsdb_head_truncations_total | Total number of head truncations attempted. |
| prometheus_tsdb_isolation_high_watermark | The highest TSDB append ID that has been given out. |
| prometheus_tsdb_isolation_low_watermark | The lowest TSDB append ID that is still referenced. |
| prometheus_tsdb_lowest_timestamp | Lowest timestamp value stored in the database. The unit is decided by the library consumer. |
| prometheus_tsdb_lowest_timestamp_seconds | Lowest timestamp value stored in the database. |
| prometheus_tsdb_mmap_chunk_corruptions_total | Total number of memory-mapped chunk corruptions. |
| prometheus_tsdb_out_of_bound_samples_total | Total number of out of bound samples ingestion failed attempts. |
| prometheus_tsdb_out_of_order_exemplars_total | Total number of out of order exemplars ingestion failed attempts. |
| prometheus_tsdb_out_of_order_samples_total | Total number of out of order samples ingestion failed attempts. |
| prometheus_tsdb_reloads_failures_total | Number of times the database failed to reloadBlocks block data from disk. |
| prometheus_tsdb_reloads_total | Number of times the database reloaded block data from disk. |
| prometheus_tsdb_retention_limit_bytes | Max number of bytes to be retained in the tsdb blocks, configured 0 means disabled |
| prometheus_tsdb_size_retentions_total | The number of times that blocks were deleted because the maximum number of bytes was exceeded. |
| prometheus_tsdb_storage_blocks_bytes | The number of bytes that are currently used for local storage by all blocks. |
| prometheus_tsdb_symbol_table_size_bytes | Size of symbol table in memory for loaded blocks |
| prometheus_tsdb_time_retentions_total | The number of times that blocks were deleted because the maximum time limit was exceeded. |
| prometheus_tsdb_tombstone_cleanup_seconds | The time taken to recompact blocks to remove tombstones. |
| prometheus_tsdb_vertical_compactions_total | Total number of compactions done on overlapping blocks. |
| prometheus_tsdb_wal_completed_pages_total | Total number of completed pages. |
| prometheus_tsdb_wal_corruptions_total | Total number of WAL corruptions. |
| prometheus_tsdb_wal_fsync_duration_seconds | Duration of WAL fsync. |
| prometheus_tsdb_wal_page_flushes_total | Total number of page flushes. |
| prometheus_tsdb_wal_segment_current | WAL segment index that TSDB is currently writing to. |
| prometheus_tsdb_wal_truncate_duration_seconds | Duration of WAL truncation. |
| prometheus_tsdb_wal_truncations_failed_total | Total number of WAL truncations that failed. |
| prometheus_tsdb_wal_truncations_total | Total number of WAL truncations attempted. |
| prometheus_tsdb_wal_writes_failed_total | Total number of WAL writes that failed. |
| prometheus_wal_watcher_current_segment | Current segment the WAL watcher is reading records from. |
| prometheus_wal_watcher_record_decode_failures_total | Number of records read by the WAL watcher that resulted in an error when decoding. |
| prometheus_wal_watcher_records_read_total | Number of records read by the WAL watcher from the WAL. |
| prometheus_wal_watcher_samples_sent_pre_tailing_total | Number of sample records read by the WAL watcher and sent to remote write during replay of existing WAL. |
| prometheus_web_federation_errors_total | Total number of errors that occurred while sending federation responses. |
| prometheus_web_federation_warnings_total | Total number of warnings that occurred while sending federation responses. |
| promhttp_metric_handler_requests_in_flight | Current number of scrapes being served. |
| promhttp_metric_handler_requests_total | Total number of scrapes by HTTP status code. |
| push_failure_time_seconds | Last Unix time when changing this group in the Pushgateway failed. |
| push_time_seconds | Last Unix time when changing this group in the Pushgateway succeeded. |
| pushgateway_build_info | A metric with a constant '1' value labeled by version, revision, branch, and goversion from which pushgateway was built. |
| pushgateway_http_push_duration_seconds | HTTP request duration for pushes to the Pushgateway. |
| pushgateway_http_push_size_bytes | HTTP request size for pushes to the Pushgateway. |
| pushgateway_http_requests_total | Total HTTP requests processed by the Pushgateway, excluding scrapes. |
| querier_index_cache_corruptions | The number of cache corruptions for the index cache. |
| querier_index_cache_encode_errors | The number of errors for the index cache while encoding the body. |
| querier_index_cache_gets | The number of gets for the index cache. |
| querier_index_cache_hits | The number of cache hits for the index cache. |
| querier_index_cache_puts | The number of puts for the index cache. |
| rabbitmq_acknowledged_published_total |  |
| rabbitmq_acknowledged_total |  |
| rabbitmq_channels |  |
| rabbitmq_connections |  |
| rabbitmq_consumed_total |  |
| rabbitmq_failed_to_publish_total |  |
| rabbitmq_not_acknowledged_published_total |  |
| rabbitmq_published_total |  |
| rabbitmq_rejected_total |  |
| rabbitmq_unrouted_published_total |  |
| replicateProject_total |  |
| spring_integration_channels | The number of message channels |
| spring_integration_handlers | The number of message handlers |
| spring_integration_sources | The number of message sources |
| spring_rabbitmq_listener_seconds | Spring RabbitMQ Listener |
| spring_rabbitmq_listener_seconds_max | Spring RabbitMQ Listener |
| system_cpu_count | The number of processors available to the Java virtual machine |
| system_cpu_usage | The "recent cpu usage" for the whole system |
| system_load_average_1m | The sum of the number of runnable entities queued to available processors and the number of runnable entities running on the available processors averaged over a period of time |
| tomcat_sessions_active_current_sessions |  |
| tomcat_sessions_active_max_sessions |  |
| tomcat_sessions_alive_max_seconds |  |
| tomcat_sessions_created_sessions_total |  |
| tomcat_sessions_expired_sessions_total |  |
| tomcat_sessions_rejected_sessions_total |  |


<!--METRICS_METADATA_END-->