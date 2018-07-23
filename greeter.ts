
enum Direction {
  Up = "up",
  Down = "down",
}
const num: Direction = Direction.Up
console.log(num)


interface B {
  name: string
}
class MyClass {
  name = ''
}

let myClass = new MyClass
console.log(myClass);

let b = <B> {}
b.name = ''
console.log(b)
