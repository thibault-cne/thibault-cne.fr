---
title: A guide through rust declarative macros
published: 2024-03-20
summary: A beginner guide to get started with rust declarative macros.
tags: rust, macros
imgUrl: https://gist.github.com/user-attachments/assets/dadc9288-a1a9-4beb-b783-136bfd1d4871
---

# A guide through rust declarative macros

Macros are a way to extend the Rust syntax. As describe in the [rust book](https://doc.rust-lang.org/book/ch19-06-macros.html), "macros are a way of writing code that writes other code, which is known as *metaprogramming*".

Rust have two types of macros, procedural macros which are invoked using the `#[derive(..)]` syntax and declarative macros. Examples of declarative macros are `vec!`, `println!` or `format!`.

I'll start with examples for beginners, then I'll try to cover more advanced examples.

---
## Why do I want to use declarative macros ?

From now on, we will refer to declarative macros as "macros". Macros can resemble functions but are different in the way that they get expanded at compile time, whereas functions are invoked at runtime. This allows to perform actions that function cannot, such as implementing traits or creating structs. Moreover, the macro syntax allows macros to take an infinite number of parameters (or tokens, we'll see that later on). For examples, we can write:

```rust
// Println take one parameter here
println!("hello");

// Println take two parameters here
println!("hello {}", "world");
```

That being said, I think the best way to understand fully the potential and use of macros is to write some macros. Let's start by creating our first rust macro.

---
## An introduction to macros

Firstly, here is the syntax to declare macros in rust. We use the `macro_rules!` keyword:

```rust
macro_rules! a_macro {
	( ) => { };
//	^^^    ^^^
//	 |      └── body of the rule (transcriber)
//	 └── the parameters of the rule (matcher)
}
```

A macro is made of rules that can match different patterns (we'll see that later on in more advanced examples). A rule is made of parameters and a body. The parameters part is a **matcher**, which means it'll try to match with the given pattern to execute the body (**transcriber**). This macro can be invoked with the following syntaxes `a_macro!()`, `a_macro![]` or `a_macro!{}`. There is no way to force a specific syntax, it just comes down to a convention that you should keep (for example `vec![]` using brackets).

---
## The matcher

The matching patterns are quite like [regex](https://en.wikipedia.org/wiki/Regular_expression). For those who are familiar with it, it'll be easier to write macros. If you're not familiar with regex, don't worry, I'll try to cover the essentials here, and you can refer to the resources down below for more information.

> **Note**: the matcher doesn't bother with spaces. I prefer to add unnecessary spaces for readability in my macros, but it's only for this purpose, and it has nothing to do with a specific syntax.

### Variables arguments

Variable arguments in macros are prefixed with `$` and they have a special *fragment specifier*.

The structure for a variable parameter is: `$` `name` `:` `fragment-specifier`.
- Both `$` and `:` are fixed
- The `name` follows the Rust naming convention.
- The `fragment-specifiers` are not Rust types. You can think of them as categories. You can find the list of fragments [here](https://veykril.github.io/tlborm/decl-macros/minutiae/fragment-specifiers.html)

> **Note**: `fragment-specifiers` are called differently and there is no consensus on their naming. From source to source, you can find the names `designator` or even `type`. Here I'll stick with the definition given in [The Little Book of Rust Macros](https://veykril.github.io/tlborm/introduction.html).

### Fixed arguments

Fixed arguments are just arguments without `$` sign and `fragment-specifier`. They may be useful to identify a specific rule of a macro. For example:

```rust
macro_rules! pow {
	(squared $n:expr) => {
		$n.pow(2)
	}
	(cubed $n:expr) => {
		$n.pow(3)
	}
}

fn main() {
	assert_eq!(pow!(squared 2_i32), 4);
	assert_eq!(pow!(cubed 2_i32), 8);
}
```

> **Note**: some *fragment specifiers* need specific follow-up. For example `expr` can be followed by `,`, `;` and `=>`. So if I wanted to write my fixed argument after the variable one I should have written `$n:expr, squared` for example. You can find a complete list of the follow-ups [here](https://veykril.github.io/tlborm/decl-macros/minutiae/metavar-and-expansion.html).

### Multiple matching

As shown in the previous example, macros can contain multiple matching patterns. The patterns are matched in order of appearance, which means usually you would like to write most-specific patterns first and least-specific ones at the end. You can find a more technical explanation [here](https://veykril.github.io/tlborm/decl-macros/minutiae/metavar-and-expansion.html).

### Repetition

We've covered macros that take variable parameters and fixed arguments, but what if I want to take an undefined number of parameters like `vec![]` ?

Well, we can use repetition operators to match patters. We can wrap up an expression inside `$()` and add a repetition operator at the end. Here are the repetition operators, you'll notice how similar they are to regex:

- `*` - indicate any number of repetition from 0 to n
- `+` - indicate any number of repetition from 1 to n
- `?` - indicate zero or one repetition

Let's say we want to add a list of numbers, we can use the following macro:

```rust
macro_rules! adder {
    () => { .. };
    ($($n:expr),*) => { .. };
}
```

> **Note**: the `,` before the `*` if a follow-up of the `expr` *fragment specifier*. It states that the list is comma separated. Here I could have used any `expr` follow-ups or none if I just wanted a space separated list. We can also note that this comma separated list don't have trailing comma. Which means `adder!(1,)` is a bad syntax. To allow the optional trailing comma, we need to write the matcher with the following pattern `$($n:expr),* $(,)?`.

---
## The transcriber

We now have covered a lot of the matcher part, but the generation of code is made in the transcriber. This is where we can use the matched parameters to write actual code. Let's see this by implementing the `adder!()` macro above.

```rust
macro_rules! adder {
    () => { 0 };
    ($($n:expr),*) => {
        {
            let mut sum = 0;
            $(
                sum += $n;
            )*
            sum
        }
    };
}

fn main() {
    assert_eq!(adder!(1, 2, 3, 4), 10);
    assert_eq!(adder!(1), 1);
    assert_eq!(adder!(), 0);
}
```

To handle the repetition we have in our matcher, we just have to wrap up the code we want to repeat inside a `$()*` code block (the repetition operator should match the one used in the matcher, that is why I used `*` here).

But what if I want to repeat different variables. For example, add some together and multiply others together ? Well, Rust handles it and you can write the following macro:

```rust
macro_rules! calculator {
	{add $($add:expr),*; mul $($mul:expr),*} => {
	   {
			let mut sum = 0;
			let mut mul = 1;
            $(
                sum += $add;
            )*
            $(
                mul *= $mul;
            )*
            (sum, mul)
		}
	}
}

fn main() {
	assert_eq!(calculator!(add 1, 2, 3; mul 1, 2, 3), (6, 6));
}
```

> **Note**: it's not possible to write the `sum += $add;` and `mul *= $mul;` lines in the same loop block because the Rust compiler won't know how many times the loop needs to be repeated if we give different numbers of arguments to both `add` and `mul`.
> It is also important to note that the transcriber actually returns a block (note the curly braces around).

---
## Export

We've seen that the macro should be declared before even calling it, so how can we export macros ?

There are two possibilities. The first one is the use of the `#[macro_export]` derive element.

```rust
#[macro_export]
macro_rules! calculator { .. }
```

You can now access this macro from anywhere in your crate with `crate::calculator!()`.

Another possibility is the `use` keyword.

```rust
macro_rules! calculator { .. }

pub use calculator;
```

This allows you to access your macro in your code, but it's still scoped in your module. For example, if the previous macro is defined in the `calculator` module, you can access it from main with `calculator::calculator!()`.

---
## A more advanced macro

Now that we have covered a lot a theory, let's try to implement a more advanced macro. Let's try to implement a macro that can calculate an expression written in [reverse polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation). In order to speed up the process, I'll show you my implementation, and I'll try to explain it.

```rust
macro_rules! rpn {
    { @inner_op stack [$r:expr, $l:expr $(, $stack:expr)*]; $op:tt $($tt:tt)* } => {
        rpn! { @inner stack [$l $op $r $(, $stack)*]; $($tt)* }
    };
    { @inner stack [$res:expr]; } => { $res };
    { @inner stack $stack:tt; + $($tt:tt)* } => {
        rpn!{ @inner_op stack $stack; + $($tt)* }
    };
    { @inner stack $stack:tt; - $($tt:tt)* } => {
        rpn!{ @inner_op stack $stack; - $($tt)* }
    };
    { @inner stack $stack:tt; * $($tt:tt)* } => {
        rpn!{ @inner_op stack $stack; * $($tt)* }
    };
    { @inner stack $stack:tt; / $($tt:tt)* } => {
        rpn!{ @inner_op stack $stack; / $($tt)* }
    };
    { @inner stack [$($stack:expr),*]; $num:tt $($tt:tt)* } => {
        rpn!{ @inner stack [$num $(, $stack)*]; $($tt)* }
    };
	{ $($tt:tt)* } => {
	   rpn!{ @inner stack [ ]; $($tt)* }
	};
}
```

As you can see, there are multiple matching patters. The ones starting with the `@inner` fixed arguments are internal matching patters used to create the result. They are not to be used by the user.

This leaves the end user with access to the `$($tt:tt)*` matching rule. This is basically a rule that accept any list of tokens. The idea is then quite simple, I followed the implementation of the *polish reverse notation*, I create an empty stack that I'll use to store the expressions while parsing.

> **Note**: the stack is a list of `expr` separated by coma.

Let's break down each rule:

```rust
{ @inner stack [$($stack:expr),*]; $num:tt $($tt:tt)* } => {
	rpn!{ @inner stack [$num $(, $stack)*]; $($tt)* }
};
```

This rule is made to match every number. Every time we encounter one, we pile it up on the stack.

Next on we have the 4 rules to match operators. For example, to match the `+` operator we have:

```rust
{ @inner stack $stack:tt; + $($tt:tt)* } => {
    rpn!{ @inner_op stack $stack; + $($tt)* }
};
```

> **Note**: we can treat the `stack` as a single `tt` (means *token-tree*) because it's between brackets.

The rules matching operators calls the rule marked with the `@inner_op` keyword. This is only to avoid code repetition.

```rust
{ @inner_op stack [$r:expr, $l:expr $(, $stack:expr)*]; $op:tt $($tt:tt)* } => {
    rpn! { @inner stack [$l $op $r $(, $stack)*]; $($tt)* }
};
```

This rule is the one doing the logic of the *reverse polish notation*. It takes the last two expressions from the stack and put them back as a new expression with the right operator.

Finally, we have the final case, where all tokens have been processed:

```rust
{ @inner stack [$res:expr]; } => { $res };
```

Here, I just return the expression build during the recursive calls.

At this point, if you invoke this macro with a valid *reverse polish notation*, it will produce a valid result.

```rust
assert_eq! { rpn! {3 4 +}, 7};
assert_eq! { rpn! {3 4 + 5 +}, 12};
assert_eq! { rpn! {3 4 5 + *}, 27};
assert_eq! { rpn! {15 7 1 1 + - / 3 * 2 1 1 + + -}, 5};
```

---
## Conclusion

That's all for today. There are still some macro patterns and technical details to cover, but I'll let you read the [references](##references) if you want to dive deeper in the world of Rust declarative macros.

I hope you learned some useful stuff and enjoy the reading ! Feel free to give any feedback or suggestions, it'll be really appreciated.

Finally, you can find some follow me on [GitHub](https://github.com/thibault-cne) and find some code snippets of this article [here](https://gist.github.com/thibault-cne/a50078771214ee2282baf3701a454b16).

## References
- [First steps with Rust declarative macros!](https://dev.to/rogertorres/first-steps-with-rust-declarative-macros-1f8m)
- [The Little Book of Rust Macros - veykril](https://veykril.github.io/tlborm/introduction.html)
- [The Rust Book](https://doc.rust-lang.org/book/ch19-06-macros.html)
- [The Little Book of Rust Macros - danielkeep](https://danielkeep.github.io/tlborm/book/README.html)

> Cover image from [Tsoding Daily](https://www.youtube.com/watch?app=desktop&v=LYIn_Ewpq-E)
