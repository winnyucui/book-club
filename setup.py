from setuptools import setup, find_packages

# sets up dev environment

setup(
    name="book-club",
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
        "mypy",
        # linter that supports type hinting
        # must enable linter in vscode settings
        # uninstall "Python for VSCode" extension if there are wrong syntax errors
        # if on macOS and run into pip ssl error: https://stackoverflow.com/questions/35280956/ignoring-ensurepip-failure-pip-7-1-2-requires-ssl-tls-python-3-x-os-x#35282183
        "flake8",
        # linter
        # must enable linter in vscode settings
        "black",  # python formatter
        "pip-tools",  # package dependency manager
        "pipdeptree",  # package dependency manager
    ],
    classifiers=[],
)
