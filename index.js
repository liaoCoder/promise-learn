class Promise {
  static PENDING = "pending";
  static FULLFILLED = "fullfilled";
  static REJECTED = "rejected";
  constructor(excutor) {
    try {
      this.value = null;
      this.status = Promise.PENDING;
      this.callbacks = [];
      excutor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject.bind(this, error);
    }
  }
  resolve(value) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.FULLFILLED;
      this.value = value;
      this.callbacks.map((callback) => {
        callback.onFullfilled(this.value);
      });
    }
  }
  reject(reason) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.value = reason;
      this.callbacks.map((callback) => {
        callback.onRejected(this.value);
      });
    }
  }
  then(onFullfilled, onRejected) {
    if (typeof onFullfilled !== "function") {
      onFullfilled = () => {};
    }

    if (typeof onRejected !== "function") {
      onRejected = () => {};
    }
    setTimeout(() => {
      if (this.status === Promise.PENDING) {
        this.callbacks.push({
          onFullfilled: (value) => {
            try {
              onFullfilled(value);
            } catch (error) {
              onRejected(error);
            }
          },
          onRejected: (reason) => {
            try {
              onRejected(reason);
            } catch (error) {
              onRejected(error);
            }
          },
        });
      }
      if (this.status === Promise.FULLFILLED) {
        try {
          onFullfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      }
      if (this.status === Promise.REJECTED) {
        try {
          onFullfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      }
    });
  }
}
