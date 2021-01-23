class Promise {
  static PENDING = "pending";
  static FULLFILLED = "fullfilled";
  static REJECTED = "rejected";
  constructor(excutor) {
    try {
      this.value = null;
      this.status = Promise.PENDING;
      excutor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject.bind(this, error);
    }
  }
  resolve(value) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.FULLFILLED;
      this.value = value;
    }
  }
  reject(reason) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.value = reason;
    }
  }
  then(onFullfilled, onRejected) {
    if(typeof onFullfilled !== "function"){
      onFullfilled = () => {};
    }

    if(typeof onRejected !== "function"){
      onRejected = () => {};
    }
    
    if (this.status === Promise.FULLFILLED) {
      onFullfilled(this.value);
    }
    if (this.status === Promise.REJECTED) {
      onRejected(this.value);
    }
  }
}
