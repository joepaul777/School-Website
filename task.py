# #odd or even 
# a=int(input("enter the number:"))
# if a%2==0 :
#     print("Even")
# else :
#     print("Odd")
  
# #leapyear
# a=int(input("Enter the year")) 
# if a%4==0 and a%100 !=0 or a%400==0 :
#     print("leap year")
# else :
#     print("not leap year ")

# vowel
a=input("Enter the vowel:")
v=a.lower()
if v in ['a','e','i','o','u']:
    print("Vowel")
else:
    print("Not vowel")

#largest number

a=int(input("Enter the first number: "))
b=int(input("Enter the second number: "))
c=int(input("Enter the third number: "))
if a>b and a>c :
    print(f"{a} is greater")
elif b>a and b>c :
    print(f"{b} is greater")
else:
    print(f"{c} is greater")