export class Customer {
	
	constructor(merchant, forename, surname, company, 
				display_name, salutation, title, 
				street, zipcode, city, email, fax, mobile, note, phone, 
				age, days_until_birthday, additional_data, customernumber, 
				dob, picture) {
		this.merchant = merchant;
		this.forename = forename;
		this.surname = surname;
		this.company = company;
		this.display_name = display_name;
		this.salutation = salutation;
		this.title = title;
		this.street = street;
		this.zipcode = zipcode;
		this.city = city;
		this.email = email;
		this.fax = fax;
		this.mobile = mobile;
		this.note = note;
		this.phone = phone;
		this.age = age;
		this.days_until_birthday = days_until_birthday;
		this.additional_data = additional_data;
		this.customernumber = customernumber;
		this.dob = dob;
		this.picture = picture;
	}
	
}
