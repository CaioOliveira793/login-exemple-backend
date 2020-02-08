CREATE USER nodeapi WITH PASSWORD 'nodeapi_password';

CREATE DATABASE login_exemple;

GRANT ALL PRIVILEGES ON DATABASE login_exemple TO nodeapi;
