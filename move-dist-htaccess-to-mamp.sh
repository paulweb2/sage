#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_FILE="${SCRIPT_DIR}/dist/.htaccess"

if [[ -n "${DEST_DIR_OVERRIDE:-}" ]]; then
  DEST_DIR="${DEST_DIR_OVERRIDE}"
elif [[ -d "/Applications/MAMP/htdocs/candc/zimbabwe_disability_toolkit" ]]; then
  DEST_DIR="/Applications/MAMP/htdocs/candc/zimbabwe_disability_toolkit"
elif [[ -d "/applications/mamp/htdocs/candc/zimbabwe_disability_toolkit" ]]; then
  DEST_DIR="/applications/mamp/htdocs/candc/zimbabwe_disability_toolkit"
else
  DEST_DIR="/Applications/MAMP/htdocs/candc/zimbabwe_disability_toolkit"
fi

DEST_FILE="${DEST_DIR}/.htaccess"

if [[ ! -f "${SOURCE_FILE}" ]]; then
  echo "Source file not found: ${SOURCE_FILE}"
  echo "Build first so dist/.htaccess exists."
  exit 1
fi

if [[ ! -d "${DEST_DIR}" ]]; then
  echo "Destination directory not found: ${DEST_DIR}"
  echo "Create it first or pass DEST_DIR_OVERRIDE=/your/path"
  exit 1
fi

if [[ -f "${DEST_FILE}" ]]; then
  BACKUP_FILE="${DEST_FILE}.bak.$(date +%Y%m%d-%H%M%S)"
  cp "${DEST_FILE}" "${BACKUP_FILE}"
  echo "Backed up existing file to: ${BACKUP_FILE}"
fi

cp -f "${SOURCE_FILE}" "${DEST_FILE}"
echo "Copied ${SOURCE_FILE} -> ${DEST_FILE}"
