var obj = {
    prop: 0,
    get Prop() {
        return ++this.prop;
    },
    arr: [],
    set pusharr(name) {
        this.arr.push(name);
    }    
}

if (typeof module !== 'undefined') module.exports = obj;