from setuptools import setup, find_packages


setup(
    name="book-club-flask",
    version="0.0.0",
    author="",
    author_email="",
    packages=find_packages(),
    scripts=[],
    url="",
    license="",
    description="",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    install_requires=[
        "requests",  # used for simple REST HTTP calls
        "flask",  # microframework
    ],
    classifiers=[],
)
