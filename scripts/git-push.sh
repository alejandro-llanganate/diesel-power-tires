#!/usr/bin/env sh
# Evita "RPC failed; HTTP 400" en pushes con imágenes (~3 MB+)
exec git -c http.postBuffer=524288000 -c http.version=HTTP/1.1 push "$@"
