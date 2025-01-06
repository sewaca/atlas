
set -a
source .env
set +a

mvn install

java -jar target/atlas-0.0.1.jar