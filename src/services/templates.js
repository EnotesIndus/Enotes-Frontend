export const templates = {

  java:
   `  
    public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}`,

  python: `print("Hello Python")`,

  cpp: `#include <iostream>
        using namespace std;

      int main() {
      cout << "Hello C++";
      return 0;
}`,

  javascript: `console.log("Hello JS");`,
};
