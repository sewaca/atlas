#!/bin/bash

set -e

cmd="$@"

until nc -z -v -w30 $ENTRYPOINT_MYSQL_HOST 3306
do
  >&2 echo "[entrypoint.sh] Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

>&2 echo "[entrypoint.sh] Database is up - starting container..."

exec $cmd