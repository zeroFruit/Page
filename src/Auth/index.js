class Auth {
  constructor() {
    if (!Auth.instance) {
      Auth.instance = this;
      this.uid = -1;
    }

    return Auth.instance;
  }
  isValidUid(uid) {
    return (
      typeof uid === 'number' &&
      [10001, 10002, 10003].indexOf(uid) !== -1
    );
  }
  setId(uid) {
    this.uid = parseInt(uid);
  }

  getId() {
    return this.uid;
  }
}

export default new Auth();
