#!/bin/bash

# 1. Ignore if it's not the main branch
if [[ "$VERCEL_GIT_COMMIT_REF" != "main" ]]; then
  echo "🛑 Build canceled: Not on the main branch."
  exit 0
fi

# 2. Ignore if triggered by bots
if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "github-actions[bot]" || "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "release-please[bot]" ]]; then
  echo "🛑 Build canceled: Triggered by an automated bot."
  exit 0
fi

# 3. If it passes all checks, proceed with the build
echo "✅ Build proceeding: Pushed to main by a human."
exit 1