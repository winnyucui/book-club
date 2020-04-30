import requests
from urllib.parse import quote
from typing import NewType, TypeVar, Generic, List
import os

"""
Tables:
- Nominations
- Users
"""

# def get_schema():
# update_schema():
# Database = NewType("Database")
# Table = NewType("Table")


K = TypeVar('K')
V1 = TypeVar('V1')
V2 = TypeVar('V2')


# mock class
class Table():
    def __init__(self, name, column_names):
        # [] where should name, column_names data come from
        self.name = name
        self.column_names = column_names
        return "I am a Table."

    def get_column_names(self) -> List[str]:
        return self.column_names

    def get_columns(
        self,
        output_format: str = "Dict[K, Tuple[V1, V2]]",
        *,
        K: str = "Author",
        V1: str = "Title",
        V2: str = "Nominator",
        **variable_definitions: str
            # if custom output_format is defined, and more variables need to be defined
    ) -> eval(output_format):
        # implement rest of function later
        return None


def DataStructure():
    def __init__(self, name):


class AirtableTable(Table):
    # AirtableDB initializes AirtableTables

    def __init__(self, name):
        # [] fix hardcode
        self.name = name
        self.column_names = ["UID", "Nominator", "Cycle", "Book Title", "Author", "Comments"]
        return "I am an Airtable Table."

    # [] add self back in
    # [] if custom output_format is defined, and more variables need to be defined
    def get_columns(
        *,
        output_format: str = "List[{c1}]",
        **definitions: str
    ):
        """
            Examples
            ==========
            Get a list of authors
                get_columns(output_format="List[c1]", c1="Author")
                get_columns(output_format="Series[c1]", c1="Author")
                get_columns(output_format="String[c1]", c1="Author")

        """
        # [] support output format: "Dict[K, Tuple[V1, V2]]"
        # check that all the column_name variables are defined
        column_names = [c_n for c_n in re.findall("\{(.*?)\}", output_format)]
        print(column_names)
        # get the columns from Airtable DB
        headers = {
            'Authorization': "Bearer {0}".format(os.environ['AIRTABLE_API_KEY'])
        }
        params = [
            ('view', 'Grid view'),
            ('maxRecords', '3'),
        ]
        params.extend(
            (('fields', definitions[c_n]) if definitions[c_n] is not None else print("Error") for c_n in column_names)
        )
        params = tuple(params)
        print("HIRSETNRS", params)
        response = requests.get('https://api.airtable.com/v0/{0}/Nominations'.format(os.environ['AIRTABLE_DB_ID']), headers=headers, params=params)
        return response.json()


        def clean_response(response: json, *targets: str) -> List[List[str]]:
            


        def format_response(cleaned_response, output_format, formatted_response):
            if len(output_format) == 0:
                return formatted_response
            else:
                data_struct = re.match("[A-Z][^[,]*[^\[]", output_format)
                peeled_output_format = output_format.strip(data_struct)[1:-1]
                if data_struct = "List":
                    return list(format_response(response, peeled_output_format, formatte))

            return


        def get_columns(
        output_format: str = "List[List[{c1}, {c2}]]",
        *,
        c1: str,  # define column 1
        c2: str,  # define column 2
        **variable_definitions: str
    ):

        # params = (
        #     ('maxRecords', '3'),
        #     ('view', 'Grid view'),
        #     ('fields', F_1),
        #     ('fields', F_2),
        #     ('fields', F_3)
        # )


        curl "https://api.airtable.com/v0/appiAalgbQrBtqbph/Nominations?maxRecords=3&view=Grid%20view" \
  -H "Authorization: Bearer YOUR_API_KEY"

        curl "https://api.airtable.com/v0/appiAalgbQrBtqbph/Nominations?maxRecords=3&view=Grid%20view" \
  -H "Authorization: Bearer YOUR_API_KEY"

        return self.column_names


# mock class
class Database():
    # Databases have many tables
    # Types of Databases include: Airtable, Google Sheets, Pandas, Postgres, mySQL, ...
    def __init__(self):
        # [] fix hardcode
        self.table_names = ["Nominations, Users"] 
        self.tables = [Table("Nominations"), Table("Users")]
        return "I am a Database."

    def get_table_names(self) -> List[str]:
        """
            Get a list of table names that a database contains.
        """
        return self.table_names

    def get_table(self, table_name: str) -> Union[Table, None]:
        for table in self.tables:
            if table.name == table_name:
                return table
        return None

    def get_columns_from_table(
        self,
        table_name: str = "Nominations", 
        output_format: str = "Dict[X, Y]",
        **fields: str
    ):
        """
            [] pass down logic to Table class
            - Get nominated book titles from Airtable API.
            - Computation is done remotely, and a lean reply is given.
            - Go optimize application speeds, think about min(transmission latency, computation time)
            - Return schemas: 
                {Book Title: Nominator} = dict, where key = "Book Title" and value = "Nominator"

            Parameters
            ----------
            table : string
                - Specifies which table of the database you are referring to.
                - Options are "Nominations

            Returns
            -------
            list : strings
                a list of book titles

            Example
            -------
            get_info_for_nominated_books(B_T="Book Title", N="Nominator, "{B_T: N}")

        """
        table = self.get_table(table_name)
        table.get_columns(**fields)


class AirtableDB(Database):

    def __init__(self, name, api_key, table_names):
        self.name = name
        self.api_key = api_key
        self.table_names = ["Users", "Nominations"]
        self.tables = [AirtableTable("Users"), AirtableTable("Nominations")]
    
    def 


#     key = "Book "


#     requests.get()

#     curl "https://api.airtable.com/v0/appiAalgbQrBtqbph/Nominations?maxRecords=3&view=Grid%20view" \
#   -H "Authorization: Bearer YOUR_API_KEY"


# url, auth=('[USERNAME]', '[PASSWORD]'), headers=headers

# fields%5B%5D=UID&fields%5B%5D=Book%20Title
# fields%5B%5D%3DUID%26fields%5B%5D%3DBook%20Title
# fields[]=UID&fields[]=Book Title

# >>> import urllib.parse
# >>> query = 'Hellö Wörld@Python'
# >>> urllib.parse.quote(query)
# 'Hell%C3%B6%20W%C3%B6rld%40Python'
