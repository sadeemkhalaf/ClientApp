export SOURCE_FOLDER=${SOURCE_FOLDER:=`pwd`/../}
export RUN_TARGET=${RUN_TARGET:=start}

docker run -p 4200:4200 -v $SOURCE_FOLDER:/app:rw -v $SOURCE_FOLDER/docker/ci:/ci -ti --rm capellasolutions/mettdfw:frontend-builder $RUN_TARGET