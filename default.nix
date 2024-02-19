{ pkgs ? import <nixpkgs> { } }:

# Fixing packages
# 1. Find out which package is needed under https://search.nixos.org/packages
# 2. Search package under https://lazamar.co.uk/nix-versions/ and pick version
# 3. Extract the packages as per instructions
# 4. Add packages in pkgs.mkShell
let
  pkgs_fix_dhall = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/d86bcbb415938888e7f606d55c52689aec127f43.tar.gz";
    })
    { };

  fix_dhall = pkgs_fix_dhall.haskellPackages.dhall_1_41_1; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall
  fix_dhall_docs = pkgs_fix_dhall.haskellPackages.dhall-docs; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall-docs
  fix_dhall_json = pkgs_fix_dhall.haskellPackages.dhall-json_1_7_10; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall-json

  pkgs_fix_dhall_lsp = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/89f196fe781c53cb50fef61d3063fa5e8d61b6e5.tar.gz"; # https://lazamar.co.uk/nix-versions/?channel=nixpkgs-unstable&package=dhall-lsp-server
    })
    { };

  fix_dhall_lsp = pkgs_fix_dhall_lsp.dhall-lsp-server;
in

pkgs.mkShell {
  NIX_SHELL = "meshcloud-shell";
  shellHook = ''
    echo starting meshcloud developer shell

    # this is where we install custom versions of dhall that are not on nixpkgs
    export PATH="$PWD/.local/bin:$PATH"
  '';

  buildInputs = [
    pkgs.opentofu
    pkgs.nodejs-18_x
    (pkgs.yarn.override {
      nodejs = pkgs.nodejs-18_x;
    })

    # NOTE: these are most likely present the wrong version on your package registry, install them into
    # ./local/bin with these instructions https://www.notion.so/meshcloud/Dhall-for-non-Haskell-Gurus-1f822f0a07f34528a89c5d4e2be3e519#1ba5901640e741e0bf8a843828e4333e
    # dhall (meshStack config model)
    fix_dhall
    fix_dhall_docs
    (fix_dhall_json.override {
      dhall = fix_dhall;
    })
    fix_dhall_lsp
  ];
}