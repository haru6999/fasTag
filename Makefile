COMPOSE=docker-compose
EXEC=$(COMPOSE) exec
BUILD=$(COMPOSE) build
UP=$(COMPOSE) up -d
LOGS=$(COMPOSE) logs
PS=$(COMPOSE) ps
STOP=$(COMPOSE) stop
RM=$(COMPOSE) rm
DOWN=$(COMPOSE) down
FLASK=$(EXEC) flask

all: docker/up ## docker up

run: ## flask run
	$(FLASK) flask run --host='0.0.0.0' 

docker/build: ## docker build
	$(BUILD)

docker/up: ## docker up
	$(UP)

docker/logs: ## docker logs
	$(LOGS)

docker/ps: ## docker ps
	$(PS)

docker/stop: ## docker stop
	$(STOP)

docker/clean: ## docker clean
	$(RM)

docker/down: ## docker down
	$(DOWN)

flask/bash: ## flask container bash
	$(FLASK) bash

help: ## Display this help screen
	@grep -E '^[a-zA-Z/_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
