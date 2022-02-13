function calculator(initialValue = 0) {

    let val = initialValue ? initialValue : 0;

    this.add = function (value = 0) {
        val += ( value? value : 0 );

        return this;
    }

    this.sub = function (value = 0) {
        val -= ( value? value : 0 );
        
        return this;
    }

    this.mult = function (value = 0) {
        val *= ( value? value : 0 );

        return this;
    }

    this.div = function (value = 0) {
        val /= ( value? value : 0 );

        return this;
    }

    this.value = function () {
        return val;
    }

    return this;
}

console.log(calculator(10).add(15).sub(10).mult(5).div(2).value());