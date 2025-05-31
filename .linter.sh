#!/bin/bash
cd /home/kavia/workspace/code-generation/piggypal-26889-fd3a129f/piggy_pal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

