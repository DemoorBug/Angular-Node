//定义创建细则套件
describe('UnitTest:MainController',function(){
//如果要定义自定义匹配器函数，则要在当前测试套件中去定义在beforeEach函数中
//使用jasmine变量的addMatchers(obj)函数声明之
beforeEach(function(){
  jasmine.addMatchers({
    toBeLessThanOrEqual: function() {
      return {
        compare: function(actual,expected) {
          return {
            pass: actual <= expected
          }
        }
      }
    }
  })
})

  //定义写着
  it('index method',function(){
    //测试代码
    var all = [1,2];
    var all2 = all;
    //toBe() 相当于 ===
    expect(all).toBe(all2);
  });
  it('login method',function(){
    //测试代码
    var all = [1,2];
    var all2 = all;
    //toBe() 相当于 ===
    expect(all).toEqual([1,2]);
  });
  it('login method2',function(){
    //测试代码
    var value = 'welcome to my class!'
    expect(value).toMatch(/welcome/);
  });
  it('test toBeundefined',function(){
    //测试代码
    var value = 10;
    var undefined_value;
    expect(value).not.toBeUndefined();
    expect(undefined_value).toBeUndefined();
  });
  it('test toContain',function(){
    //测试代码
    var value = [0,1,2,3];
    expect(value).toContain(3);
  });
  it('test toBeCloseTo',function(){
    //测试代码
    //toBeCloseTo(val,fix)
    var value = [0,1,2,3];
    expect(value).toContain(3);
  });
  it('test toBeCloseTo',function(){
    //测试代码
    //toBeCloseTo(val,fix)
    var value = 30.02;
    expect(value).toBeCloseTo(30.0,1);
  });
  it('test toThrow',function(){
    //测试代码
    //toThrow(fn)
    expect(function(){
      return a+10;
    }).toThrow();

  });
})

describe('UnitTest:setup and tearsdown',function() {
  var count = 0;
  afterEach(function(){
    //在该函数中为每个测试用例重新初始化变量
    count = 0;
  });
  it('shoud add one to count', function(){
    count += 1;//该句不会影响下面测试的结果
    expect(count).toEqual(1);
  });
  it('shoud check for the reset value', function(){
   expect(count).toEqual(0);
  })

})
