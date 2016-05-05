"""
Code taken from (and modified slightly):
https://github.com/j0hnsmith/django-pipeline-browserify/blob/master/pipeline_browserify/compiler.py
"""

import os
import logging
import subprocess
from django.conf import settings

from pipeline.compilers import SubProcessCompiler


log = logging.getLogger(__name__)


class BrowserifyCompiler(SubProcessCompiler):
    output_extension = 'js'

    def match_file(self, path):
        return path.endswith('.js') or path.endswith('.jsx')

    def compile_file(self, infile, outfile, outdated=False, force=False):
        if not force and not outdated:
            return False
        pipeline_settings = getattr(settings, 'PIPELINE', {})

        log.info('Processing %s to %s.', infile, outfile)
        print 'Processing {} to {}.'.format(infile, outfile)
        pipeline_settings['infile'] = infile
        pipeline_settings['outfile'] = outfile

        command = '{vars} {bin} {args} {infile} -o {outfile}'.format(
            vars=pipeline_settings.get('BROWSERIFY_VARS', ''),
            bin=pipeline_settings.get('BROWSERIFY_BINARY', 'browserify'),
            args=pipeline_settings.get(
                'BROWSERIFY_ARGUMENTS', '-t [ babelify --presets [ es2015 react ] ]'),
            infile=infile,
            outfile=outfile).strip()
        log.debug(command)
        print command
        p = subprocess.Popen(command.split(), env=os.environ.copy())
        p.wait()
