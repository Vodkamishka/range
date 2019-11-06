
(() => {

interface Props {
    class?: string
    type?: string
    value?: string
    min?: string
    max?: string
}
    
function createElement(tag: string, props: Props, ...children: any) {
    const element: any = document.createElement(tag)
  
    element.classList.add(`${props.class}`)
    element.type = props.type
    element.setAttribute('value', props.value)
   
    children.forEach((el: any) => {
        if (typeof el === 'string') {el = document.createTextNode(el)}
        element.appendChild(el)
    }) 
    return element
}

class View {
    wrapper: HTMLElement | null
    between!: HTMLElement | null
    begin!: HTMLElement | null
    end!: HTMLElement | null
   
    constructor(random: number) { 
       this.wrapper = document.getElementById(random.toString()) 
       this.create()
       if ( this.wrapper !== null) {
            this.between = this.wrapper.querySelector('.between')
            this.begin = this.wrapper.querySelector('.begin')
            this.end = this.wrapper.querySelector('.end')
        }
     } 
    create () {
        if (this.wrapper !== null){
            let num1:HTMLElement = createElement('div', {class: 'num1'})
            let num2:HTMLElement = createElement('div', {class: 'num2'})
            let between:HTMLElement = createElement('div', {class: 'between'})
            let begin:HTMLElement = createElement('div', {class: 'begin'})
            let end:HTMLElement = createElement('div', {class: 'end'})
            
            let slider1:HTMLInputElement = createElement('input', {class: 'slider1', type: 'range', min: '0', max: '25000', value: '5000'})
            let slider2:HTMLInputElement = createElement('input', {class: 'slider2', type: 'range', min: '0', max: '25000', value: '15000'})

            let range:HTMLElement = createElement('div', {class: 'range'}, slider1, slider2, between, begin, end, num1, num2)

            let p:HTMLElement = createElement('p', {class: 'p'}, "Панель конфигурации:")

            let min:HTMLInputElement = createElement('input', {class: 'min', type: 'text', value: '0'})
            let labelMin:HTMLElement = createElement('label', {class: 'label'}, 'Мин. диапазона', min)
            let max:HTMLInputElement = createElement('input', {class: 'max', type: 'text', value: '25000'})
            let labelMax:HTMLElement = createElement('label', {class: 'label'}, 'Макс. диапазона', max)
            let value1:HTMLInputElement = createElement('input', {class: 'value1', type: 'text', value: '5000'})
            let labelVal1:HTMLElement = createElement('label', {class: 'labelVal1'}, 'Значение 1', value1)
            let value2:HTMLInputElement = createElement('input', {class: 'value2', type: 'text', value: '15000'})
            let labelVal2:HTMLElement = createElement('label', {class: 'labelVal2'}, 'Значение 2', value2)
            let flag1:HTMLInputElement = createElement('input', {class: 'flag1', type: 'checkbox', value: ''})
            let labelFlag1:HTMLElement = createElement('label', {class: 'labelFlag1'}, 'Откл. бегунок 1', flag1)
            let flag2:HTMLInputElement = createElement('input', {class: 'flag2', type: 'checkbox', value: ''})
            let labelFlag2:HTMLElement = createElement('label', {class: 'labelFlag2'}, 'Откл. бегунок 2', flag2)
            let inpNum1:HTMLInputElement = createElement('input', {class: 'inpNum1', type: 'checkbox', value: ''})
            let labelNum1:HTMLElement = createElement('label', {class: 'labelNum1'}, 'Откл. значение 1', inpNum1)
            let inpNum2:HTMLInputElement = createElement('input', {class: 'inpNum2', type: 'checkbox', value: ''})
            let labelNum2:HTMLElement = createElement('label', {class: 'labelNum2'}, 'Откл. значение 2', inpNum2)
            let rotate:HTMLInputElement = createElement('input', {class: 'rotateSlider', type: 'checkbox', value: ''})
            let labelRotate:HTMLElement = createElement('label', {class: 'labelRotate'}, 'Вкл. вертикальный вид', rotate)
            let step:HTMLInputElement = createElement('input', {class: 'step', type: 'text', value: ''})
            let labelStep:HTMLElement = createElement('label', {class: 'label'}, 'Размер шага 1', step)
            let step2:HTMLInputElement = createElement('input', {class: 'step2', type: 'text', value: ''})
            let labelStep2:HTMLElement = createElement('label', {class: 'label'}, 'Размер шага 2', step2)
            
            
            let panel:HTMLElement = createElement('div', {class: 'panel'}, p, labelMin, labelMax, labelVal1, 
            labelVal2, labelFlag1, labelFlag2, labelNum1, labelNum2, labelRotate, labelStep, labelStep2)

            this.wrapper.appendChild(panel)
            this.wrapper.appendChild(range)
        }
    }
    viewBetween = (left: number,  betwWidth: number) => {
        if (this.between !== null){
            this.between.style.marginLeft = left + 'px'
            this.between.style.width = betwWidth + 'px'
        }
    }
    viewScale = (begin: string, end: string) => {
        if (this.begin !== null) {this.begin.innerHTML = begin}
        if (this.end !== null) {this.end.innerHTML = end}
    }
    viewNum = (el: HTMLElement, num: number, left: number) => {
        el.innerHTML = num.toString()
        el.style.marginLeft = left.toString() + 'px'
    }
    viewValue = (el: HTMLInputElement , num: number) => el.value = num.toString()
    viewHideBall = (el: HTMLInputElement, el2: HTMLElement, el3: HTMLInputElement) => {
        el.classList.toggle('hide')
        if (el.parentNode !== null && el.parentNode.querySelectorAll('.hide').length < 2 && this.between !== null) this.between.classList.toggle('hide')
        el2.classList.toggle('white')
        el3.classList.toggle('white')
    }
    viewHideNum = (el: HTMLElement) => el.classList.toggle('white')
    viewRotate = (el: HTMLElement, el2: HTMLElement, el3: HTMLElement) => {
        el.classList.toggle('rotate')
        el2.classList.toggle('rotateReverse')
        el3.classList.toggle('rotateReverse')
    }
}

class Model {
    wrapper: HTMLElement | null
    range!: HTMLElement | null
    scale!: number
    min!: HTMLInputElement | null
    max!: HTMLInputElement | null
    val1!: HTMLInputElement | null
    val2!: HTMLInputElement | null
    slider1!: HTMLInputElement | null
    slider2!: HTMLInputElement | null
    flag1!: HTMLInputElement | null
    flag2!: HTMLInputElement | null
    num1!: HTMLElement | null
    num2!: HTMLElement | null
    begin!: HTMLElement | null
    end!: HTMLElement | null
    inpNum1!: HTMLInputElement | null
    inpNum2!: HTMLInputElement | null
    step!: HTMLInputElement | null
    step2!: HTMLInputElement | null
    rotateSlider!: HTMLInputElement | null
    
    constructor (random: number) {
        this.wrapper = document.getElementById(random.toString()) 
        if (this.wrapper !== null){
             const f = (element: string): any => {
                if (this.wrapper !== null) return this.wrapper.querySelector(element)
             } 
             this.range = f('.range')
             this.val1 = f('.value1')
             this.val2 = f('.value2')
             this.min = f('.min')
             this.max = f('.max')
             this.slider1 = f('.slider1')
             this.slider2 = f('.slider2')
             this.flag1 = f('.flag1')
             this.flag2 = f('.flag2')
             this.num1 = f('.num1')
             this.num2 = f('.num2')
             this.begin = f('.begin')
             this.end = f('.end')  
             this.inpNum1 = f('.inpNum1')
             this.inpNum2 = f('.inpNum2')
             this.step = f('.step')
             this.step2 = f('.step2') 
             this.rotateSlider = f('.rotateSlider')     
       }   
    }
    modelAddEvent (f: any) {
        let $ = this.helper()
        if ($.el !== null) $.el.addEventListener('input', f)
        if ($.el2 !== null) $.el2.addEventListener('input', f)
    }
    modelBetween = (f: any) => f(this.helper().left, this.helper().betwLength)  
    modelScale = (f: any) => f(this.helper().min.value, this.helper().max.value)
    modelNum (f: any) {
        let $ = this.helper()
        let left: number = ($.value - Number($.min.value)) * $.slWidth/$.widthScale 
        f($.num1, $.value, left)
        f($.num2, $.value2, $.right)
    }
    modelValue (f: any){
        let $ = this.helper()
        f ($.val1, $.value)
        f ($.val2, $.value2)
    }
    modelSetValue (f: any, f2: any) {
        let $ = this.helper()
        const func = () => {
            let $ = this.helper()
            if ($.val1 !== null) f($.el, Number($.val1.value))
            if ($.val2 !== null) f($.el2, Number($.val2.value))
        }
        const funcs = () => {
            func ()
            f2 ()
        }
        funcs()
        if ($.val1 !== null) $.val1.addEventListener('change',funcs)
        if ($.val2 !== null) $.val2.addEventListener('change',funcs)
    }
    modelSetScale (f: any, f2: any) {
        let $ = this.helper()
        const funcs = () => {f()
            f2()
        }
        $.min.addEventListener("change", funcs)
        $.max.addEventListener("change", funcs)
    }
    modelHideBall (f: any) {
        let $ = this.helper()
        if (this.flag1 !== null) this.flag1.addEventListener('change', () => f($.el, this.num1, $.val1))
        if (this.flag2 !== null) this.flag2.addEventListener('change', () => f($.el2, this.num2, $.val2))
    }
    modelHideNum (f: any) {
        if (this.inpNum1 !== null) this.inpNum1.addEventListener('change', () => f(this.num1))
        if (this.inpNum2 !== null) this.inpNum2.addEventListener('change', () => f(this.num2))
    }
    modelRotate (f: any) {
        if (this.range !== null && this.rotateSlider !== null) this.rotateSlider.addEventListener('change', () => f(this.range, this.num1, this.num2))
    }
    helper () {
        let el: HTMLInputElement | null = this.slider1
        let el2: HTMLInputElement | null = this.slider2
        let val1: HTMLInputElement | null = this.val1
        let val2: HTMLInputElement | null = this.val2
        let min!: HTMLInputElement
        if (this.min !== null)  min = this.min
        let max!: HTMLInputElement
        if (this.max !== null)  max = this.max
        let num1: HTMLElement | null = this.num1
        let num2: HTMLElement | null = this.num2
        let begin: HTMLElement | null = this.begin
        let end: HTMLElement | null = this.end
        let slWidth!: number
        let widthScale!: number
        let value!: number 
        let value2!: number 
        let betwLength!: number 
        if ( el!==null && el2 !== null && this.step !== null && this.step2 !== null) {
            slWidth = el.offsetWidth
            widthScale = Math.abs(Number(max.value) - Number(min.value))
            value = Number(el.value) 
            value2 = Number(el2.value) 
            betwLength =  slWidth * Math.abs(value - value2)/widthScale
            el.min = min.value
            el2.min = min.value
            el.max = max.value
            el2.max = max.value
            el.step = this.step.value
            el2.step = this.step2.value
        }
        if (val1 !== null) val1.addEventListener('input', () => {
            if (val1 !== null) value = Number(val1.value)
        })   
        if (val2 !== null) val2.addEventListener('input', () => {
            if (val2 !== null) value = Number(val2.value)
        })  
        let left: number = (value - Number(min.value)) * slWidth/widthScale 
        let right: number = (value2 - Number(min.value)) * slWidth/widthScale 
        if (value2 > value) {left = left}
        else {left = right}
        return {el, el2, slWidth, widthScale, betwLength, value, value2, left, right, min, max, num1, num2, val1, val2, begin, end}
    }  
}

class Controller {
    view: any
    model: any
    
    constructor (view:any, model: any) {
       this.view = view
       this.model = model 
       this.addEvent()
       this.controllerScale()
       this.calls()
       this.controllerSetValue()
       this.controllerSetScale()
       this.controllerHideBall()
       this.controllerHideNum() 
       this.controllerRotate() 
    }
    calls = () => {
        this.controllerNum ()
        this.controllerBetween ()
    }
    f = () => {
        this.controllerNum()
        this.controllerValue()
        this.controllerBetween() 
    }
    addEvent = () => this.model.modelAddEvent(this.f)
    controllerBetween = () => this.model.modelBetween (this.view.viewBetween)
    controllerScale = () => this.model.modelScale (this.view.viewScale)
    controllerNum = () => this.model.modelNum(this.view.viewNum)
    controllerValue = () => this.model.modelValue(this.view.viewValue)
    controllerSetValue = () => this.model.modelSetValue (this.view.viewValue, this.calls)
    controllerSetScale = () => this.model.modelSetScale (this.controllerScale, this.f)
    controllerHideBall = () => this.model.modelHideBall(this.view.viewHideBall)
    controllerHideNum = () => this.model.modelHideNum(this.view.viewHideNum)
    controllerRotate = () => this.model.modelRotate(this.view.viewRotate)
}

window.onload = function () {

let wrapper:NodeListOf<HTMLElement> | null  = document.querySelectorAll('.wrapper')

if (wrapper !== null){wrapper.forEach((el:HTMLElement) => {
    let random: number = Math.floor(Math.random()*10000000000000)
    el.id = random.toString()
    const view = new View(random)
    const model = new Model(random)
    const controller = new Controller(view, model)
})}
}

})()