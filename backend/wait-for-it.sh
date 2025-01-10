#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

# Periksa apakah host dan port dapat diakses
until nc -z "$host"; do
  >&2 echo "Service $host belum siap - menunggu..."
  sleep 1
done

>&2 echo "Service $host sudah siap - melanjutkan ke perintah berikutnya."
exec $cmd
