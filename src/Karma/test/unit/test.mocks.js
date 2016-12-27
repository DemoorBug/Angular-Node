describe('test mocks',function(){
  var scope;
  //创建模拟的模块对象
  //angular.mock.module('myApp');
  beforeEach(module('myApp'));//改写法等同于上面语句，mocks模块会将module方法附加到window对象上
  //创建完模块后，可用注入需要的服务
  //使用angular.mock.inject(function(){})注入
  beforeEach(inject(function(_$rootScope_){
    scope = $rootScope.$new();
    scope.username = 'Tom'
  }));

  it('scope username', function(){
    expect(scope.username).toEqual('Tom')
  });
})
