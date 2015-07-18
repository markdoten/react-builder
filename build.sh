#!/bin/bash

printf 'App name (no spaces) [] : '
read -r APP_NAME

printf 'App description [] : '
read -r APP_DESC

printf 'App path [.] : '
read -r APP_LOC

printf 'Include backend server? [no] : '
read -r INC_SERVER

printf 'Default port [3001] : '
read -r PORT

printf 'Include Makefile? [no] : '
read -r INC_MAKEFILE

printf 'Include Twitter Bootstrap? [yes] : '
read -r INC_BOOTSTRAP


if [ $INC_SERVER == 'y' -o $INC_SERVER == 'yes' ]; then
  echo 'use server'
fi
