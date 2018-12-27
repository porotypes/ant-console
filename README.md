# mgr-web
这个项目是用[Angular CLI](https://github.com/angular/angular-cli)版本6.2.5生成的(Angular CLI已提升到7.0)。
# #配置文件
	“src\environments”
	environment.ts为开发环境下的  
	environment.prod.ts为生产环境下的  
	base_url为api地址  
# #开发服务器
为开发服务器运行“ng service”。导航到http://localhost: 4200 /。如果您更改了任何源文件，应用程序将自动重新加载。
# #代码脚手架
运行“ng generate component-name”来生成一个新组件。您还可以使用“ng generate directive|pipe|service|class|guard|interface|enum|module”来生成指令|pipe|service b| service|class|guard|interface|enum|module”。
# #构建
运行“ng build”来构建项目。构建构件将存储在“dist/”目录中。请使用“—prod”标志进行生产构建。
# #进一步帮助
要想在Angular CLI上获得更多帮助，可以使用“ng help”，或者查看[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)。

# docker编译
1、获取源码 git clone https://gitlab.ywqian.com:8081/atm-blockchain/mgr-web.git
2、进入项目 cd /mgr-web
3、将源码编译为静态文件：docker run --rm --name node-build -v "${pwd}":/ -w /usr/share/node/html node npm i & npm install -g @angular/cli & ng build --prod
4、构建镜像docker build -t antt .