# How to add new Menu Route

## Main link shouldn't have link and must have children or only link and order has to be <= 1000

###### Main Menu
```
{
  title: 'Main Route Menu',
  path: 'some-path',
  order: 1000,
  children: [{}, {}]
}
```


###### Main Menu Without Children
```
{
  title: 'Main Menu Without Route Menu',
  link: 'some-path',
  order: 1000
}
```

###### Sub Menu Without Children
```
{
  title: 'Sub Route Menu',
  link: 'some-path',
  order: 2000,
  children: [{}, {}]
}
```
