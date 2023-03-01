const exercise = require('../exercise1')

describe('fizzBuzz', () => {
    it('should throw if input is not a number ', () => {
        const args = [null,'',false,true,{},[]]
        args.forEach((a) => {
            expect(() => { exercise.fizzBuzz(a) }).toThrow()
        })
    })

    it('should return FizzBuzz if input is divisible by 3 and 5',()=>{
        const result = exercise.fizzBuzz(15)
        expect(result).toBe('FizzBuzz');
    })

    it('should return Fizz if number is divisible by 3 only',()=>{
        const result = exercise.fizzBuzz(12)
        expect(result).toBe('Fizz');
    })

    it('should return Buzz if number is divisble by 5 only',()=>{
        const result = exercise.fizzBuzz(10)
        expect(result).toBe('Buzz');
    })

    it('should return the input if number is not divisible by 3 or 5',()=>{
        const result = exercise.fizzBuzz(11)
        expect(result).toBe(11);
    })

})