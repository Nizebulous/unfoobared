#!/bin/bash

set -e

echo "Running migrations..."
python manage.py migrate
echo "Done."
echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Done."

echo "Preparing logs..."
touch /gunicorn.log
touch /access.log
touch /app.log
tail -n 0 -f /*.log &
echo "Done" >> /gunicorn.log
# Start Gunicorn processes
echo "Starting Gunicorn." >> /gunicorn.log
exec gunicorn unfoobared.wsgi:application \
    --name unfoobared \
    --bind 0.0.0.0:80 \
    --workers 3 \
    --log-level=info \
    --log-file=/gunicorn.log \
    --access-logfile=/access.log \
    "$@"
