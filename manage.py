#!/usr/bin/env python
"""
manage.py
"""
import os
import re
import sys


def read_env():
    """
    Pulled from Honcho code with minor updates, reads local default
    environment variables from a .env file located in the project root
    directory.
    """
    try:
        with open('.env') as f:
            for line in f:
                m1 = re.match(r'\A([A-Za-z_0-9]+)=(.*)\Z', line.strip())
                if m1:
                    key, val = m1.group(1), m1.group(2)
                    m2 = re.match(r"\A'(.*)'\Z", val)
                    if m2:
                        val = m2.group(1)
                    m3 = re.match(r'\A"(.*)"\Z', val)
                    if m3:
                        val = re.sub(r'\\(.)', r'\1', m3.group(1))
                    os.environ.setdefault(key, val)
    except IOError:
        # No .env file
        pass


if __name__ == "__main__":
    read_env()
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unfoobared.settings")

    # pylint: disable=wrong-import-position
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
