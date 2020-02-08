FROM postgres:alpine

WORKDIR /docker-entrypoint-initdb.d

COPY *.sql ./

EXPOSE 5432
