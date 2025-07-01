{
  description = "A Nix flake for the meshStack docs developer shell";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";

    # Fixing packages
    # 1. Find out which package is needed under https://search.nixos.org/packages
    # 2. Search package under https://lazamar.co.uk/nix-versions/ and pick version
    # 3. Extract the packages as per instructions
    # 4. Add packages in pkgs.mkShell
    dhall-pkgs = {
      url = "github:NixOS/nixpkgs/d86bcbb415938888e7f606d55c52689aec127f43";
    };
  };

  outputs = { self, nixpkgs, flake-utils, dhall-pkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        dhallpkgs = import dhall-pkgs { inherit system; };

        fix_dhall = dhallpkgs.haskellPackages.dhall_1_41_1; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall
        fix_dhall_docs = dhallpkgs.haskellPackages.dhall-docs; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall-docs
        fix_dhall_json = dhallpkgs.haskellPackages.dhall-json_1_7_10; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall-json
        fix_dhall_lsp = dhallpkgs.dhall-lsp-server;

        core_packages = [
          # node / typescript (meshPanel, utilities eetc.)
          pkgs.nodejs_22
          (pkgs.yarn.override {
            nodejs = pkgs.nodejs_22;
          })
        ];
      in
      {
        devShells.default = pkgs.mkShell {
          name = "shell with all basic runtimes and tools";
          packages = core_packages;
        };
      }
    );
}
