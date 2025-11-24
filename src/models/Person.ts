export class Person {
  protected _id: string;
  protected _name: string;
  protected _address: string;
  protected _phone: string;

  constructor(id: string, name: string, address: string, phone: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._phone = phone;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  set name(v: string) {
    this._name = v;
  }

  get address(): string {
    return this._address;
  }
  set address(v: string) {
    this._address = v;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(v: string) {
    this._phone = v;
  }

  public getInfo(): string {
    return `ID: ${this._id} | ${this._name} | ${this._address} | ${this._phone}`;
  }
}
