COLEO

Outil de gestion des taches et des projets de la société OCELO.

Bundle : meteor build --server-only --architecture os.linux.x86_64 --debug ../bundles

Déploiement docker run :

    # démarrer la base de donnée mongo

    docker run --network=private_network --name coleo-mongo -d -v ~/prod/coleo-mongo:/data/db mongo mongod --replSet "rs0"

    # Initialiser le replicaSet de la base mongo

    docker run -it --link coleo-mongo:mongo --network=private_network --rm mongo sh -c 'exec mongo mongo:27017/local --eval "rs.initiate();cfg=rs.conf();cfg.members[0].host = \"localhost:27017\";rs.reconfig(cfg, {force:true});" '

    # Run du container ocelo/meteor:1.4

    docker run -d --name coleo-webapp -e VIRTUAL_PORT=8080 --expose 8080 -e PORT=8080 -e VIRTUAL_HOST=coleo.ocelo.fr,www.coleo.ocelo.fr -e ROOT_URL=http://coleo.ocelo.fr -e MAIL_URL=$OCELO_COLEO_MAIL -v /home/supervisor/prod/coleo-sources/bundle/:/home/meteor/www -e MONGO_URL=mongodb://coleo-mongo:27017/coleodb -e MONGO_OPLOG_URL=mongodb://coleo-mongo:27017/local --network=private_network ocelo/meteor:1.4

Déploiement docker compose :

```
version: '2'
services:

  coleo-webapp:
    image: ocelo/meteor:1.4
    container_name: coleo-webapp
    hostname: coleo-webapp
    restart: always
    volumes:
      - /home/supervisor/prod/coleo-sources/bundle/:/home/meteor/www
    environment:
      - VIRTUAL_HOST=coleo.ocelo.fr,www.coleo.ocelo.fr
      - VIRTUAL_PORT=8080
      - PORT=8080
      - ROOT_URL=http://coleo.ocelo.fr
      - MAIL_URL=$OCELO_COLEO_MAIL
      - MONGO_URL=mongodb://coleo-mongo:27017/coleodb
      - MONGO_OPLOG_URL=mongodb://coleo-mongo:27017/local
    expose:
      - "8080"
    networks:
      - private_network
    depends_on:
      - coleo-mongo

  coleo-mongo:
    image: mongo
    container_name: coleo-mongo
    hostname: coleo-mongo
    command: mongod --replSet "rs0"
    restart: always
    volumes:
      - /home/supervisor/prod/coleo-mongo:/data/db
    networks:
      - private_network

      
  coleo-mongo-worker:
    image: mongo
    command: sh -c 'exec mongo mongo:27017/local --eval "rs.initiate();cfg=rs.conf();cfg.members[0].host = \"localhost:27017\";rs.reconfig(cfg, {force:true});" '
    depends_on:
      - coleo-mongo
    networks:
      - private_network

networks:
  private_network:
    external: true
```

Développeurs : Mathieu BREMOND
Contact : mathieu.bremond@ocelo.fr


