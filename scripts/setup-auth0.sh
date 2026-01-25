#!/usr/bin/env bash
set -e

APP_NAME="Anchor"
BASE_URL="http://localhost:3000"
CALLBACK_URL="${BASE_URL}/auth/callback"
LOGOUT_URL="${BASE_URL}"
ORIGIN_URL="${BASE_URL}"

echo "🔐 Setting up Auth0 app: ${APP_NAME}"

# Ensure deps exist
command -v auth0 >/dev/null 2>&1 || {
  echo "Auth0 CLI not found. Installing..."
  brew tap auth0/auth0-cli
  brew install auth0
}

command -v jq >/dev/null 2>&1 || {
  echo "jq not found. Install with: brew install jq"
  exit 1
}

# Login (interactive)
auth0 login

# Create Auth0 app
auth0 apps create \
  --name "${APP_NAME}" \
  --type regular \
  --callbacks "${CALLBACK_URL}" \
  --logout-urls "${LOGOUT_URL}" \
  --web-origins "${ORIGIN_URL}" \
  --reveal-secrets \
  --json \
  > auth0-app.json

CLIENT_ID=$(jq -r '.client_id' auth0-app.json)
CLIENT_SECRET=$(jq -r '.client_secret' auth0-app.json)

DOMAIN=$(auth0 tenants list --json | jq -r '.[] | select(.active == true) | .domain // (.name + ".auth0.com")')

AUTH0_SECRET=$(openssl rand -hex 32)

cat > .env.local <<EOF
AUTH0_DOMAIN=${DOMAIN}
AUTH0_CLIENT_ID=${CLIENT_ID}
AUTH0_CLIENT_SECRET=${CLIENT_SECRET}
AUTH0_SECRET=${AUTH0_SECRET}
APP_BASE_URL=${BASE_URL}
EOF

rm auth0-app.json

echo "✅ Auth0 setup complete."
echo "📄 .env.local created (DO NOT COMMIT)"
