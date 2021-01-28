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
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFullfilled(this.value);
        });
      });
    }
  }
  reject(reason) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(this.value);
        });
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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.status === Promise.PENDING) {
          this.callbacks.push({
            onFullfilled: (value) => {
              try {
                let result = onFullfilled(value);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            },
            onRejected: (reason) => {
              try {
                let result = onFullfilled(reason);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            },
          });
        }
        if (this.status === Promise.FULLFILLED) {
          try {
            let result = onFullfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
        if (this.status === Promise.REJECTED) {
          try {
            let reason = onFullfilled(this.value);
            reject(reason);
          } catch (error) {
            reject(error);
          }
        }
      });
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

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (this.status === Promise.PENDING) {
        this.callbacks.push({
          onFullfilled: (value) => {
            try {
              let result = onFullfilled(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
          onRejected: (reason) => {
            try {
              let result = onFullfilled(reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
        });
      }
      if (this.status === Promise.FULLFILLED) {
        try {
          let result = onFullfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === Promise.REJECTED) {
        try {
          let reason = onFullfilled(this.value);
          reject(reason);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}