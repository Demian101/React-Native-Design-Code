
- [代码结构](#代码结构)
- [功能界面](#功能界面)
- [代码详解](#代码详解)



# 代码结构

```js
Repository
|-- App.js
|-- app.json
|-- babel.config.js
|-- package.json
|-- assets
|-- src
    |-- components
    |   |-- Avatar.js   // 头像组件
    |   |-- Cards.js    // 滑动卡片
    |   |-- Course.js   // 课程组件
    |   |-- Icons.js    // 图标
    |   |-- Logo.js     // svg 组件
    |   |-- UserProfile  // 用户信息
    |   |   |-- index.js
    |   |   |-- styles.js
    |   |-- UserProfileItem  // 用户信息详情
    |       |-- index.js
    |       |-- styles.js
    |-- config
    |   |-- ReactotronConfig.js
    |-- navigator          // 全局的导航栏
    |   |-- HomeStack.js   // Home page 堆栈
    |   |-- index.js
    |-- screens         // Navigator 的每一个 Tab 对应一个 Screen           
    |   |-- Homescreen.js
    |   |-- Sectionscreen.js
    |   |-- CourseScreen.js
    |-- store             // Redux 全局状态
        |-- index.js
        |-- reducer
            |-- profileSlice.js
```




# 功能界面

持续完善中...



# 代码详解

Wrapper :

- 比如标题、子标题，内容，如果三个内容都需要 pl-12，不如直接在 Wrapper 里 pl-12

```
  <Wrapper>
    <Caption>{props.caption}</Caption>
    <Subtitle>{props.subtitle}</Subtitle>
  </Wrapper>
```





## TouchableOpacity





## Animated

```js
import { Animated, TouchableOpacity, StyleSheet, Dimensions} from "react-native";


const AnimatedContainer = Animated.createAnimatedComponent(Container);
```



实现一个渐入渐出效果：

```
import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim
          }
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default App;
```









### Animated.spring









- 图书馆结构设计
- 图书资源设计
- 创建、添加、修改、删除 书籍
- 调用相关脚本

图书馆挂在某个账户（account）下面.



# Playground

Address 里配置：
| Name              | Address |
| :---------------- | :------ |
| MyCounterAddr     | 0x1     |
| StarcoinFramework | 0x1     |
| MyAddr            | 0x1     |


```move

module MyAddr::MyLibrary {
  use StarcoinFramework::Signer;
  use StarcoinFramework::Vector;

  struct Book has store, copy, drop {
    id: u64,
    name: vector<u8>,
    link: vector<u8>
  }

  struct Library has key {  books: vector<Book>  }

  public fun intial_library(account: &signer){
    move_to<Library>(account, Library{ books: Vector::empty<Book>()});
  }

  public fun add_book(account: &signer) {
    let books = Vector::empty<Book>();
    move_to(account, Library { books })
  }

  public fun addBook(account: &signer, name: vector<u8>, link: vector<u8>) acquires Library {
    let lib = borrow_global_mut<Library>(Signer::address_of(account));
    let id = Vector::length(&lib.books);
    Vector::push_back(&mut lib.books, Book { id, name, link } ) 
  }

  public fun update_by_id(account: &signer, id: u64, 
    name: vector<u8>, link: vector<u8> ) acquires Library {
    
    let lib = borrow_global_mut<Library>(Signer::address_of(account));
    let book_ = Vector::borrow_mut<Book>(&mut lib.books, id);
    book_.name = name;
    book_.link = link;      
  }

  public fun delete_by_id(account: &signer, id: u64) acquires Library {
    let lib = borrow_global_mut<Library>(Signer::address_of(account));
    Vector::remove(&mut lib.books, id);
  }

  public(script) fun init_library(account: signer){
    Self::intial_library(&account);
  }

  public(script) fun s_add_book(account: signer, name:vector<u8>, link: vector<u8>) acquires  Library {
    Self::addBook(&account, name, link);
  }
  
  public(script) fun s_update_book_at_id(account: signer, id:u64,name:vector<u8>, link: vector<u8>) acquires  Library {
    Self::update_by_id(&account,id,name,link)
  }

  public(script) fun s_delete_book_at_id(account: signer, id:u64) acquires  Library {
    Self::delete_by_id(&account,id)
  }

}
```
