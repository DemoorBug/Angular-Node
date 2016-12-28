describe('test mocks',function(){
  var $rootScope,scope;  //如果变量名和注入的服务同名，则注入的服务前后加_
  //创建模拟的模块对象
  //angular.mock.module('myApp');
  beforeEach(module('myApp'));//改写法等同于上面语句，mocks模块会将module方法附加到window对象上
  //创建完模块后，可用注入需要的服务
  //使用angular.mock.inject(function(){})注入
  beforeEach(inject(function(_$rootScope_){
    scope = _$rootScope_.$new();
    scope.username = 'Tom'
  }));

  it('scope username', function(){
    expect(scope.username).toEqual('Tom')
  });
})


//测试$httpBackend
describe('Remote test',function(){
  var $httpBackend,$rootScope,myService;
  beforeEach(module('myApp'));
  beforeEach(inject(function(_$rootScope_,_$httpBackend_,_myService_){
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      //myService是一个自定义服务，为我们产生HTTP调用
      myService = _myService_;

    }));
  //要确定每个测试结束时，不会仍有未结束的请求挂起
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should make a request to the backend',function(){
    //建立一个预期
    $httpBackend.expect('GET','/v1/api/current_user').respond(200,{userid:123});
    //前端发送请求
    myService.getCurrentUser();
    //冲刷请求很重要
    $httpBackend.flush();
    //在一个多阶段测试内部复用$httpBackend的统一实例时要重置所有已设置请求的预期
    $httpBackend.resetExpectations();
  })
})


//测试控制器
describe('test controller',function(){
  //模拟MyApp模块
  beforeEach(module('myApp'));
  describe('myController', function(){
    //创建局部变量:控制器和局部作用域
    var myController,scope;
    //要创建控制器实例,需要$controller服务
    //要创建局部作用域，需要首先注入$rootScope
    beforeEach(inject(function($controller,$rootScope){
      //创建子作用域
      scope = $rootScope.$new();
      //创建myController的新实例
      myController = $controller('myController',{$scope:scope})
    }))
    //测试代码放在这里
    //1.测试today已经设置了
    it('should have today set',function(){
      expect(scope.time.today).toBeDefined();
    })
    //2.测试user已经设置了
    it('should have a user set',function(){
      expect(scope.user).toBeDefined()
    })
  })
})

//测试服务
describe('test services', function(){
  beforeEach(module('myApp'));
  describe('version',function(){
    var version;
    beforeEach(inject(function($injector){
      //使用$injector获取版本服务，等同于之前的注入写法
      version = $injector.get('version');
      // version = _version_;
    }));
    //测试版本是否符合预期
    it('should have the version as a service', function(){
      expect(version).toEqual('0.0.1')
    })
  })
})


//指令测试
describe('test directives', function(){
  beforeEach(module('myApp')); //模拟应用主模块
  describe('notification', function(){
    //声明变量：元素，相关作用域
    var element,scope;
    beforeEach(inject(function($compile,$rootScope){
      scope = $rootScope;
      element = angular.element('<div notification message="note"></div>')
      //编译生成的dom元素才能正常起作用
      $compile(element)(scope);
      //运行digest循环使之生效
      scope.$apply();
    }));
    //测试代码
    it('should display the welcome text',function(){
      scope.$apply(function(){
        scope.note = 'NotiController message';
      })
      //元素内容中期望有新加入的消息
      expect(element.html()).toContain('NotiController message');
    })
  })
})
