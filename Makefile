BUILD := false
FOLLOW := false

start-development:
	docker compose -f docker-compose.yml up $(if $(filter false,$(FOLLOW)),-d,) $(if $(filter true,$(BUILD)),--build,) --force-recreate

stop-development:
	docker compose -f docker-compose.yml stop

remove-development:
	docker compose -f docker-compose.yml down --rmi all