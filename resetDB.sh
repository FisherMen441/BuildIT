#!/bin/bash

# Stop on errors
set -e
set -x

mysql.server start
cd backend/sql
mysql -uroot buildIT < drop.sql
mysql -uroot buildIT < schema.sql
mysql -uroot buildIT < data.sql
