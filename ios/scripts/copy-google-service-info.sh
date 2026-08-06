#!/usr/bin/env bash
set -euo pipefail

# Copies the correct Firebase GoogleService-Info.plist into the app bundle.
# Prod:  GoogleService-Info.plist
# Stage: GoogleService-Info-stage-IJ.plist
#
# Stage is selected when:
# - configuration name contains "Stage", or
# - ENVFILE is .env.stage, or
# - PRODUCT_BUNDLE_IDENTIFIER ends with ".stage"

SRCROOT_DIR="${SRCROOT:-}"
if [[ -z "${SRCROOT_DIR}" ]]; then
  SRCROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
fi

APP_DIR="${BUILT_PRODUCTS_DIR:?}/${PRODUCT_NAME:?}.app"
DEST="${APP_DIR}/GoogleService-Info.plist"

ENV_FILE="${ENVFILE:-}"
CONFIG_NAME="${CONFIGURATION:-}"
BUNDLE_ID="${PRODUCT_BUNDLE_IDENTIFIER:-}"
TARGET="${TARGET_NAME:-}"

is_stage=false
case "${ENV_FILE}" in
  *.env.stage*|stage) is_stage=true ;;
esac
case "${CONFIG_NAME}" in
  *Stage*) is_stage=true ;;
esac
case "${BUNDLE_ID}" in
  *.stage) is_stage=true ;;
esac
case "${TARGET}" in
  *stage*|*Stage*) is_stage=true ;;
esac

if [[ "${is_stage}" == true ]]; then
  SOURCE="${SRCROOT_DIR}/GoogleService-Info-stage-IJ.plist"
  echo "info: Using STAGE Firebase config (${SOURCE})"
else
  SOURCE="${SRCROOT_DIR}/GoogleService-Info.plist"
  echo "info: Using PROD Firebase config (${SOURCE})"
fi

if [[ ! -f "${SOURCE}" ]]; then
  echo "error: Firebase config not found at ${SOURCE}" >&2
  exit 1
fi

mkdir -p "${APP_DIR}"
cp -f "${SOURCE}" "${DEST}"
echo "info: Copied Firebase config to ${DEST}"
