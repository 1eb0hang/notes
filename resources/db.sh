#! /bin/bash

sqlite3 demo.db <<EOF
$(cat ./demo.sqlite)
EOF

#mv robotsworldDatabase.db resources/robotsworldDatabase.db

printf "Database \"demo\" created\n"
 
