FROM docker.io/openjdk:8-jre-slim
LABEL maintainer "Juan Pablo de Castro <jpdecastro@tel.uva.es>"

# persistent / runtime deps
RUN apt-get update && apt-get install -y --no-install-recommends libnetcdf-c++4 curl nano && rm -r /var/lib/apt/lists/*

ENV NOTO_FONTS="NotoSans-unhinted NotoSerif-unhinted NotoMono-hinted" \
    GOOGLE_FONTS="Open%20Sans Roboto Lato Ubuntu" \
    GEOSERVER_VERSION="2.15.0" \
    GEOSERVER_PLUGINS="css grib imagemosaic-jdbc mongodb netcdf pyramid vectortiles wps ysld" \
    GEOSERVER_HOME="/usr/share/geoserver" \
    GEOSERVER_NODE_OPTS='id:$host_name' \
    JAVA_OPTS="-Xbootclasspath/a:${JAVA_HOME}/jre/lib/ext/marlin-0.9.2-Unsafe.jar -Xbootclasspath/p:${JAVA_HOME}/jre/lib/ext/marlin-0.9.2-Unsafe-sun-java2d.jar -Dsun.java2d.renderer=org.marlin.pisces.MarlinRenderingEngine -XX:+UseG1GC"

# Install Google Noto fonts
RUN mkdir -p /usr/share/fonts/truetype/noto && \
    for FONT in ${NOTO_FONTS}; \
    do \
        curl -sS -O https://noto-website-2.storage.googleapis.com/pkgs/${FONT}.zip && \
    	unzip -o ${FONT}.zip -d /usr/share/fonts/truetype/noto && \
    	rm -f ${FONT}.zip ; \
    done

# Install Google Fonts
RUN \
    for FONT in $GOOGLE_FONTS; \
    do \
        mkdir -p /usr/share/fonts/truetype/${FONT} && \
        curl -sS -o ${FONT}.zip "https://fonts.google.com/download?family=${FONT}" && \
    	unzip -o ${FONT}.zip -d /usr/share/fonts/truetype/${FONT} && \
    	rm -f ${FONT}.zip ; \
    done

# Install native JAI
RUN \
    cd $JAVA_HOME && \
    curl -sS -L -O https://download.java.net/media/jai/builds/release/1_1_3/jai-1_1_3-lib-linux-amd64-jre.bin && \
    echo "yes" | sh jai-1_1_3-lib-linux-amd64-jre.bin && \
    rm jai-1_1_3-lib-linux-amd64-jre.bin

# Install ImageIO
RUN \
    cd $JAVA_HOME && \
    export _POSIX2_VERSION=199209 &&\
    curl -sS -L -O https://download.java.net/media/jai-imageio/builds/release/1.1/jai_imageio-1_1-lib-linux-amd64-jre.bin && \
    echo "yes" | sh jai_imageio-1_1-lib-linux-amd64-jre.bin && \
    rm jai_imageio-1_1-lib-linux-amd64-jre.bin

# Get Marlin Renderer
RUN \
    cd $JAVA_HOME/lib/ext/ && \
    curl -L -sS -O https://github.com/bourgesl/marlin-renderer/releases/download/v0_9_2/marlin-0.9.2-Unsafe.jar && \
    curl -L -sS -O https://github.com/bourgesl/marlin-renderer/releases/download/v0_9_2/marlin-0.9.2-Unsafe-sun-java2d.jar && \
    curl -L -sS -O https://jdbc.postgresql.org/download/postgresql-42.0.0.jar && \
    sed -i 's/^assistive_technologies=/#&/' /etc/java-8-openjdk/accessibility.properties

#
# GEOSERVER INSTALLATION
#

# Install GeoServer
RUN curl -sS -L -O http://sourceforge.net/projects/geoserver/files/GeoServer/$GEOSERVER_VERSION/geoserver-$GEOSERVER_VERSION-bin.zip && \
    unzip geoserver-$GEOSERVER_VERSION-bin.zip && mv -v geoserver-$GEOSERVER_VERSION $GEOSERVER_HOME && \
    rm geoserver-$GEOSERVER_VERSION-bin.zip && \
    sed -e 's/>PARTIAL-BUFFER2</>SPEED</g' -i $GEOSERVER_HOME/webapps/geoserver/WEB-INF/web.xml && \
    # Remove old JAI from geoserver
    rm -rf $GEOSERVER_HOME/webapps/geoserver/WEB-INF/lib/jai_codec-*.jar && \
    rm -rf $GEOSERVER_HOME/webapps/geoserver/WEB-INF/lib/jai_core-*jar && \
    rm -rf $GEOSERVER_HOME/webapps/geoserver/WEB-INF/lib/jai_imageio-*.jar && \
    rm -rf $GEOSERVER_HOME/webapps/geoserver/WEB-INF/lib/marlin-*.jar && \
    echo "--module=servlets" >> $GEOSERVER_HOME/start.ini && \
    echo "--module=proxy" >> $GEOSERVER_HOME/start.ini && \
    echo "--module=client" >> $GEOSERVER_HOME/start.ini && \
    echo "--module=threadpool" >> $GEOSERVER_HOME/start.ini && \
 #   echo "--module=jndi"    >> $GEOSERVER_HOME/start.ini && \
    echo '[depend]\nserver\nplus\nutil\n[xml]\ndata_dir/jetty-jndi.xml\n[lib]\nlib/jetty-jndi-${jetty.version}.jar' > $GEOSERVER_HOME/modules/jndi.mod && \
    echo '[depend]\nserver\n[lib]\nlib/jetty-plus-${jetty.version}.jar' > $GEOSERVER_HOME/modules/plus.mod && \
    echo '[depend]\nserver\n[lib]\nlib/jetty-util-${jetty.version}.jar' > $GEOSERVER_HOME/modules/util.mod && \
    echo '[depend]\nserver\n[lib]\nlib/jetty-servlets-${jetty.version}.jar' > $GEOSERVER_HOME/modules/servlets.mod && \
	echo '[lib]\nlib/jetty-client-${jetty.version}.jar' > $GEOSERVER_HOME/modules/client.mod && \
    echo '[depend]\nclient\nservlet\n[lib]\nlib/jetty-proxy-${jetty.version}.jar' > $GEOSERVER_HOME/modules/proxy.mod && \
    echo '[lib]\nlib/jetty-threadpool-${jetty.version}.jar' > $GEOSERVER_HOME/modules/threadpool.mod && \
    cd  $GEOSERVER_HOME/lib/ && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-plus/9.4.12.v20180830/jetty-plus-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-jndi/9.4.12.v20180830/jetty-jndi-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-servlets/9.4.12.v20180830/jetty-servlets-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-util/9.4.12.v20180830/jetty-util-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-client/9.4.12.v20180830/jetty-client-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-proxy/9.4.12.v20180830/jetty-proxy-9.4.12.v20180830.jar && \
    curl -sS -L -O http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-threadpool/9.4.12.v20180830/jetty-threadpool-9.4.12.v20180830.jar && \
    perl -i -0777 -pe 's/<!--\s*?(<filter.*?cross-origin.*?\/filter>)\s*?-->/$1/s' $GEOSERVER_HOME/webapps/geoserver/WEB-INF/web.xml && \
    perl -i -0777 -pe 's/<!--\s*?(<filter-mapping.*?cross-origin.*?\/filter-mapping>)\s*?-->/$1/s' $GEOSERVER_HOME/webapps/geoserver/WEB-INF/web.xml

#COPY jetty-jndi.xml $GEOSERVER_HOME/data_dir/

# Config the context /app to publish static files (html, js, css).
COPY appcontext.xml $GEOSERVER_HOME/webapps/

# Install GeoServer Plugins
RUN for PLUGIN in ${GEOSERVER_PLUGINS}; \
    do \
      curl -sS -L -O http://sourceforge.net/projects/geoserver/files/GeoServer/$GEOSERVER_VERSION/extensions/geoserver-$GEOSERVER_VERSION-$PLUGIN-plugin.zip && \
      unzip -o geoserver-$GEOSERVER_VERSION-$PLUGIN-plugin.zip -d /usr/share/geoserver/webapps/geoserver/WEB-INF/lib/ && \
      rm geoserver-$GEOSERVER_VERSION-$PLUGIN-plugin.zip ; \
    done

# Expose GeoServer's default port
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s\
    CMD curl -f "http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities" || exit 1

COPY docker-entrypoint.sh /

RUN mkdir -p $GEOSERVER_HOME && \
    chgrp -R 0 $GEOSERVER_HOME && \
    chmod -R g=u $GEOSERVER_HOME /etc/passwd /var/log

### Containers should NOT run as root as a good practice
USER 101010

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["geoserver"]