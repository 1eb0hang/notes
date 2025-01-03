
clean:
	mvn clean

compile:
	mvn clean compile

package:
	mvn clean package

package_no_test:
	mvn clean package -DskipTests

run_mvn:
	mvn exec:java -Dexec.mainClass="com.wren.App"

run_web:
	cd web && mvn exec:java -Dexec.mainClass="com.wren.web.WebService"
