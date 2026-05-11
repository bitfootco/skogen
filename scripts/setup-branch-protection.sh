#!/usr/bin/env bash
# Run once by a repo admin after the first CI run has created the job names.
# Requires: gh CLI authenticated with admin access to bitfootco/skogen.
set -euo pipefail

REPO="bitfootco/skogen"
BRANCH="main"

echo "Applying branch protection rules to ${REPO}:${BRANCH}..."

gh api "repos/${REPO}/branches/${BRANCH}/protection" \
  --method PUT \
  --header "Accept: application/vnd.github+json" \
  --field 'required_status_checks={"strict":true,"contexts":["Lint","Typecheck","Test","Build"]}' \
  --field 'enforce_admins=true' \
  --field 'required_pull_request_reviews={"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field 'restrictions=null' \
  --field 'allow_force_pushes=false' \
  --field 'allow_deletions=false' \
  --field 'required_linear_history=true'

echo "Branch protection applied successfully."
