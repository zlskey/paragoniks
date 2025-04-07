BUILD := false
FOLLOW := false

start-production:
	docker compose -f docker-compose.prod.yml up $(if $(filter false,$(FOLLOW)),-d,) $(if $(filter true,$(BUILD)),--build,) --force-recreate -d

start-development:
	docker compose -f docker-compose.dev.yml up $(if $(filter false,$(FOLLOW)),-d,) $(if $(filter true,$(BUILD)),--build,) --force-recreate
	ngrok http --domain=pro-loudly-sheep.ngrok-free.app 3000

pull-images:
	docker compose -f docker-compose.prod.yml pull

stop-production:
	docker compose -f docker-compose.prod.yml stop

stop-development:
	docker compose -f docker-compose.dev.yml stop

remove-production:
	docker compose -f docker-compose.prod.yml down --rmi all

remove-development:
	docker compose -f docker-compose.dev.yml down --rmi all