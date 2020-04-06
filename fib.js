function fibtreeHelper(n) {
	var value;
	var div = document.createElement('div');
	div.setAttribute("class", "fib-item");

	n = parseInt(n);

	// leaf nodes aka. base case
	if (n < 2) {
		if (n === 0) {
			value = 0;
		}
		else if (n === 1) {
			value = 1;
		}
		var p = document.createElement('p');
		p.textContent = 'Fib(' + n + ') = ' + value;
		div.appendChild(p)
	}
	else {
		var left = fibtreeHelper(n - 1);
		var clas = left.html.getAttribute('class');
		left.html.setAttribute('class', clas + ' fib-left');

		var right = fibtreeHelper(n - 2);
		clas = right.html.getAttribute('class');
		right.html.setAttribute('class', clas + ' fib-right');

		value = left.value + right.value;
		var p = document.createElement('p');
		p.textContent = 'Fib(' + n + ') = ' + value;
		div.appendChild(p);

		div.appendChild(left.html);
		div.appendChild(right.html);
	}

	return { 'value': value, 'html': div };
}

var fibtree = function (n, node) {
    // Remove an existing Fibonacci tree
	var fibTree = node.querySelector('div.fib-item');
	if (fibTree) {
		node.removeChild(fibTree);
	}

	var tree = fibtreeHelper(n);
	node.appendChild(tree.html);
}

var fibtreeslider = function(me) {
	var form = me.parentNode;
    var value = me.value;
    console.log('Fibonacci tree value = ' + value);
    var label = document.querySelector('label#tree-label');
    label.textContent = "Fib(" + value + ")";
    fibtree(value, form.parentNode);
}



var fiblist = function(n, node) {
    // Remove an existing Fibonacci list
    var fiblist = node.querySelector('div.fib-list');
    if (fiblist) {
        node.removeChild(fiblist);
    }

    var list = fiblistHelper(n);
    node.appendChild(list);
}

var fiblistHelper = function(n)  {
    // create a div that is .fib-list
    var div = document.createElement('div');
    div.setAttribute('class', 'fib-list');

    // fill it with a list of numbers
    for (var i = 0, a = 0, b = 1; i <= n; ++i, b = a + b, a = b - a) {
        var num = document.createElement('div');
        num.setAttribute('class', 'fib-item');
        var p = document.createElement('p');
        p.textContent = a;
        num.appendChild(p);
        div.appendChild(num);
    }

    return div;
}


var fiblistSlider = function(me) {
	var form = me.parentNode;
    var value = me.value;
    console.log('Fibonacci list value = ' + value);
    var label = form.querySelector('label#list-label');
    label.textContent = "Fib(" + value + ")";
    fiblist(value, form.parentNode);
}



////////////////////////////////////////////////////////////////////////////////
// Main code (such as it is)
////////////////////////////////////////////////////////////////////////////////
; /* Super important semi-colon.

 If you remove it, this program breaks

 If you don't remove it, you are left wondering why people take this langauge
 seriously
  */

// Set the document title
(() => {
    document.title = 'Dynamic Fibonacci Sequence in JavaScript';

    // Red div for the Fibonacci list
    (() => {
        // Create a red div in the body
        var div = document.createElement('div');
        div.setAttribute('class', 'red fib-container');
        document.querySelector('body').appendChild(div);

        var p = document.createElement('p');
        p.textContent = "Fibonacci List";
        div.appendChild(p);

        // Put a form within the div
        var form = document.createElement('form');
        div.appendChild(form);

        // Add a label for an upcoming slider input...
        var label = document.createElement('label');
        label.setAttribute('for', 'list-slider');
        label.setAttribute('id', 'list-label');
        form.appendChild(label);

        // ...and put a slider within the form
        var input = document.createElement('input');
        input.setAttribute('id', 'list-slider');
        input.setAttribute('type', 'range');
        input.setAttribute('min', '0');
        input.setAttribute('max', '50');
        input.setAttribute('value', '0');
        input.oninput = function(e) { fiblistSlider(e.target); };
        form.appendChild(input);

        fiblistSlider(document.querySelector('input#list-slider'));
    })();


    // Green div for the Fibonacci tree
    (() => {
        // Create a green div in the body
        var div = document.createElement('div');

        div.setAttribute('class', 'green fib-container');
        document.querySelector('body').appendChild(div);

        var p = document.createElement('p');
        p.textContent = "Fibonacci Tree";
        div.appendChild(p);

        // Put a form within the div
        var form = document.createElement('form');
        div.appendChild(form);

        // Add a label for an upcoming slider input...
        var label = document.createElement('label');
        label.setAttribute('for', 'tree-slider');
        label.setAttribute('id', 'tree-label');
        form.appendChild(label);

        // ...and put a slider within the form
        var input = document.createElement('input');
        input.setAttribute('id', 'tree-slider');
        input.setAttribute('type', 'range');
        input.setAttribute('min', '0');
        input.setAttribute('max', '11');
        input.setAttribute('value', '0');
        input.oninput = function(e) { fibtreeslider(e.target); };
        form.appendChild(input);

        fibtreeslider(document.querySelector('input#tree-slider'));
    })();
})();
