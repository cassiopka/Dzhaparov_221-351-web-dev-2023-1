// Функция priority позволяет получить 
// значение приоритета для оператора.
// Возможные операторы: +, -, *, /.
// ----------------------------------------------------------------------------
// The "priority" function allows you to 
// get the priority of an operator. 
// Possible operators: +, -, *, /.

// Функция priority определяет приоритет операции.
function priority(operation) {
    // Если операция является сложением или вычитанием, возвращаем 1 (низкий приоритет).
    if (operation == '+' || operation == '-') {
        return 1;
    }
    // В противном случае возвращаем 2 (высокий приоритет).
    else {
        return 2;
    }
}


// Проверка, является ли строка str числом.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a number.

// Функция isNumeric проверяет, является ли переданная строка числом.
function isNumeric(str) {
    // Используется регулярное выражение для проверки строки.
    // ^ - начало строки
    // \d+ - одна или более цифр
    // (.\d+){0,1} - точка и одна или более цифр, в скобках {0,1} указывает, что это может повторяться 0 или 1 раз
    // $ - конец строки
    return /^\d+(.\d+){0,1}$/.test(str);
}


// Проверка, является ли строка str цифрой.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains a digit.

// Функция isDigit проверяет, состоит ли переданная строка из одной цифры.
function isDigit(str) {
    // Используется регулярное выражение для проверки строки.
    // ^ - начало строки
    // \d - одна цифра
    // {1} - ровно один раз
    // $ - конец строки
    return /^\d{1}$/.test(str);
}


// Проверка, является ли строка str оператором.
// ----------------------------------------------------------------------------
// Checking if the string "str" contains an operator.

// Функция isOperation проверяет, является ли переданная строка математической операцией (+, -, *, /).
function isOperation(str) {
    // Используется регулярное выражение для проверки строки.
    // ^ - начало строки
    // [\+\-\*\/] - символ +, -, * или /
    // {1} - ровно один раз
    // $ - конец строки
    return /^[\+\-\*\/]{1}$/.test(str);
}


// Функция tokenize принимает один аргумент -- строку
// с арифметическим выражением и делит его на токены 
// (числа, операторы, скобки). Возвращаемое значение --
// массив токенов.
// ----------------------------------------------------------------------------
// The "tokenize" function takes one argument, a string 
// with an arithmetic expression, and divides it into 
// tokens (numbers, operators, brackets).The return value 
// is an array of tokens.

// Функция tokenize разбивает математическое выражение на токены (числа, операции, скобки).
function tokenize(str) {
    let tokens = [];
    let lastNumber = '';

    // Итерация по символам в строке.
    for (char of str) {
        // Если символ является цифрой или точкой, добавляем его к текущему числу.
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            // Если текущее число не пустое, добавляем его в массив токенов и обнуляем lastNumber.
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        }

        // Если символ является операцией или скобкой, добавляем его в массив токенов.
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        }
    }

    // Проверяем, если последнее число не пустое, добавляем его в массив токенов.
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }

    // Возвращаем массив токенов.
    return tokens;
}


// Функция compile принимает один аргумент -- строку
// с арифметическим выражением, записанным в инфиксной 
// нотации, и преобразует это выражение в обратную 
// польскую нотацию (ОПН). Возвращаемое значение -- 
// результат преобразования в виде строки, в которой 
// операторы и операнды отделены друг от друга пробелами. 
// Выражение может включать действительные числа, операторы 
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции 
// (https://ru.wikipedia.org/wiki/Алгоритм_сортировочной_станции).
// ----------------------------------------------------------------------------
// The compile function takes one argument, a string with an arithmetic 
// expression written in infix notation, and converts this expression to 
// reverse Polish notation(RPN).The return value is the result of the 
// conversion as a string with operators and operands separated by 
// spaces.The expression can include real numbers, +, -, *, / operators, 
// and brackets. All operators are binary and left associative. 
// The function implements the Shunting yard algorithm
// (https://en.wikipedia.org/wiki/Shunting_yard_algorithm).

// Функция compile преобразует математическое выражение в постфиксную нотацию (обратную польскую запись).
function compile(str) {
    let out = [];  // Массив для хранения выходной последовательности (постфиксная запись).
    let stack = [];  // Стек для операций и скобок.

    // Итерация по токенам, полученным из функции tokenize.
    for (token of tokenize(str)) {
        // Если токен является числом, добавляем его в выход.
        if (isNumeric(token)) {
            out.push(token);
        }
        // Если токен - операция, обрабатываем стек операций.
        else if (isOperation(token)) {
            while (stack.length > 0 &&
                isOperation(stack[stack.length - 1]) &&
                priority(stack[stack.length - 1]) >= priority(token)) {
                // Перемещаем операции с более высоким или равным приоритетом из стека в выход.
                out.push(stack.pop());
            }
            // Добавляем текущую операцию в стек.
            stack.push(token);
        }
        // Если токен - открывающая скобка, добавляем её в стек.
        else if (token == '(') {
            stack.push(token);
        }
        // Если токен - закрывающая скобка, перемещаем операции из стека в выход, пока не встретим открывающую скобку.
        else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            // Удаляем открывающую скобку из стека.
            stack.pop();
        }
    }

    // Перемещаем оставшиеся операции из стека в выход.
    while (stack.length > 0) {
        out.push(stack.pop());
    }

    // Возвращаем постфиксную запись, объединенную пробелами.
    return out.join(' ');
}


// Функция evaluate принимает один аргумент -- строку 
// с арифметическим выражением, записанным в обратной 
// польской нотации. Возвращаемое значение -- результат 
// вычисления выражения. Выражение может включать 
// действительные числа и операторы +, -, *, /.
// Вам нужно реализовать эту функцию
// (https://ru.wikipedia.org/wiki/Обратная_польская_запись#Вычисления_на_стеке).
// ----------------------------------------------------------------------------
// The evaluate function takes one argument, a string 
// containing an arithmetic expression written in reverse 
// Polish notation.The return value is the result of 
// evaluating the expression.The expression can include 
// real numbers and the operators +, -, *, /. 
// You need to implement this function
// (https://en.wikipedia.org/wiki/Reverse_Polish_notation).

// Функция evaluate вычисляет результат математического выражения в постфиксной нотации.
function evaluate(str) {
    const stack = [];  // Стек для операндов.

    // Разбиваем строку на токены, используя пробел в качестве разделителя.
    const tokens = str.split(' ');

    // Итерация по токенам.
    for (const token of tokens) {
        // Если токен является числом, добавляем его в стек.
        if (isNumeric(token)) {
            stack.push(parseFloat(token));
        }
        // Если токен - операция, выполняем соответствующую операцию над двумя верхними операндами в стеке.
        else if (isOperation(token)) {
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            let result;

            // Выбираем операцию в зависимости от токена.
            switch (token) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    result = operand1 / operand2;
                    break;
                default:
                    throw new Error('Unknown operator: ' + token);
            }

            // Добавляем результат обратно в стек.
            stack.push(result);
        }
    }

    // Если в стеке остался ровно один элемент, возвращаем его как результат вычислений.
    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return stack[0];
}



// Функция clickHandler предназначена для обработки 
// событий клика по кнопкам калькулятора. 
// По нажатию на кнопки с классами digit, operation и bracket
// на экране (элемент с классом screen) должны появляться 
// соответствующие нажатой кнопке символы.
// По нажатию на кнопку с классом clear содержимое экрана 
// должно очищаться.
// По нажатию на кнопку с классом result на экране 
// должен появиться результат вычисления введённого выражения 
// с точностью до двух знаков после десятичного разделителя (точки).
// Реализуйте эту функцию. Воспользуйтесь механизмом делегирования 
// событий (https://learn.javascript.ru/event-delegation), чтобы 
// не назначать обработчик для каждой кнопки в отдельности.
// ----------------------------------------------------------------------------
// The clickHandler function is designed to handle click events 
// on calculator buttons. When buttons with classes "digit", 
// "operation" and "bracket" are pressed, the symbols corresponding 
// to the pressed button should appear on the screen 
// (element with the class "screen"). On clicking the button with 
// the "clear" class, the contents of the screen should be cleared.
// By clicking on the button with the "result" class, the result of 
// the calculation of the entered expression should appear on the screen 
// with an accuracy of two decimal places after the decimal separator (point). 
// Implement this function. Use the event delegation mechanism 
// (https://javascript.info/event-delegation) so as not to set a 
// handler for each button separately.

// Навешиваем обработчик события "click" на документ.
document.addEventListener('click', function (event) {
    // Получаем цель события (элемент, на который было совершено нажатие).
    const target = event.target;

    // Проверяем, принадлежит ли цель классам 'digit', 'operation' или 'bracket'.
    if (target.classList.contains('digit') ||
        target.classList.contains('operation') ||
        target.classList.contains('bracket')) {
        // Если да, вызываем функцию для обработки нажатия на кнопки digit, operation, bracket.
        handleSymbolClick(target.textContent);
    }
    // Проверяем, принадлежит ли цель классу 'clear'.
    else if (target.classList.contains('clear')) {
        // Если да, вызываем функцию для обработки нажатия на кнопку clear.
        clearScreen();
    }
    // Проверяем, принадлежит ли цель классу 'result'.
    else if (target.classList.contains('result')) {
        // Если да, вызываем функцию для обработки нажатия на кнопку result.
        evaluateExpression();
    }
});


// Функция handleSymbolClick обрабатывает нажатие на кнопку и добавляет соответствующий символ на экран.
function handleSymbolClick(symbol) {
    const screen = document.querySelector('.screen span');
    screen.textContent += symbol;
}

// Функция clearScreen очищает содержимое экрана.
function clearScreen() {
    const screen = document.querySelector('.screen span');
    screen.textContent = '';
}

// Функция evaluateExpression вычисляет результат выражения на экране и отображает его с точностью до двух знаков после десятичной точки.
function evaluateExpression() {
    const screen = document.querySelector('.screen span');
    const expression = screen.textContent;

    try {
        // Вычисляем результат выражения, предварительно преобразовав его в постфиксную форму.
        const result = evaluate(compile(expression));

        // Отображаем результат с точностью до двух знаков после десятичной точки.
        const formattedResult = result.toFixed(2);
        screen.textContent = formattedResult;
    } catch (error) {
        // Если произошла ошибка, отображаем сообщение об ошибке.
        screen.textContent = 'Error';
    }
}




// Назначьте нужные обработчики событий.
// ----------------------------------------------------------------------------
// Set event handlers.

// Ожидаем полной загрузки окна, затем устанавливаем обработчик события "click".
window.onload = function () {
    document.addEventListener('click', clickHandler);
};

