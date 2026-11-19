
#!/usr/bin/env bash

# Reflex Cameras - Update Stripe Payment Link notices
# Updates the checkout message on all three products.

MESSAGE="Australia and New Zealand customers: Please order through our local distributor, Saffron Aid: https://saffronaid.com/store/reflex-cameras"

# Payment link IDs
LINKS=(
  "Reflex Standard Multiple|plink_1UM0u4B611DYs6VBgpW4iEGk"
  "Reflex Standard|plink_1UCzH7B611DYs6VBjB37YsOv"
  "Reflex Lynx|plink_1UPk4AB611DYs6VBbwxa1pgO"
  "Reflex Pit Viper|plink_1UPk7kB611DYs6VB2Ofg1GIt"
)

# # Ask for Stripe API key without displaying it
# read -r -s -p "Enter your Stripe live secret key: " STRIPE_SECRET_KEY
# echo

# # Check that a live secret key was provided
# if [[ "$STRIPE_SECRET_KEY" != sk_live_* ]]; then
#   echo "Error: Expected a live Stripe secret key (sk_live_...)."
#   unset STRIPE_SECRET_KEY
#   exit 1
# fi

# Retrieve Stripe API key from macOS Keychain
STRIPE_SECRET_KEY=$(security find-generic-password \
  -a "$USER" \
  -s "reflex-stripe-api" \
  -w) || {
    echo "Error: Could not retrieve Stripe API key."
    exit 1
}

# Temporary file for Stripe responses
RESPONSE_FILE=$(mktemp) || exit 1
trap 'unset STRIPE_SECRET_KEY; rm -f "$RESPONSE_FILE"' EXIT

FAILED=0

# Update each payment link
for ENTRY in "${LINKS[@]}"; do
  NAME="${ENTRY%%|*}"
  ID="${ENTRY#*|}"

  echo "Updating $NAME..."

  HTTP_CODE=$(curl --silent --show-error \
    --output "$RESPONSE_FILE" \
    --write-out "%{http_code}" \
    "https://api.stripe.com/v1/payment_links/$ID" \
    -u "$STRIPE_SECRET_KEY:" \
    --data-urlencode "custom_text[submit][message]=$MESSAGE")

  if [[ "$HTTP_CODE" == "200" ]]; then
    echo "Success: $NAME updated."
  else
    echo "FAILED: $NAME (HTTP $HTTP_CODE)"
    cat "$RESPONSE_FILE"
    echo
    FAILED=1
  fi
  echo
done

if [[ "$FAILED" == "0" ]]; then
  echo "All payment links updated successfully."
else
  echo "Some updates failed. Review the errors above."
  exit 1
fi
